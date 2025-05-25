import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { supabase } from '../database/db';
import { registerSchema } from '../schemas/registerSchema';

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // validate request body
    const validationResult = registerSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        message: 'Invalid input',
        errors: validationResult.error.issues,
      });
      return;
    }

    const { username, password } = validationResult.data;

    // Supabase error handling is async and could fail silently (does not throw exceptions by default),
    // so it's better to check for duplication explicitly instead of relying on database constraint errors only
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      res.status(409).json({ message: 'Username already taken.' });
      return;
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds); // hash the password saltRound number of times
    const { data, error } = await supabase
      .from('users')
      .insert([{ username, password_hash }]) // data variable name must correspond to the table column name
      .select('id, username, created_at, default_currency_code');

    if (error) {
      // check for unique constraint violation (Supabase error code for unique violation is '23505')
      if (error.code === '23505') {
        res
          .status(409)
          .json({ message: 'Username already taken.', error: error.message });
        return;
      }
      console.log('Error creating user', error);
      res.status(500).json({
        message: 'Internal server error. Please try again later.',
      });
    }
    if (!data || data.length === 0) {
      console.error(
        'User creation returned no data, though no explicit error.',
      );
      res.status(500).json({ message: 'User created, but no data returned.' });
      return;
    }

    res.status(201).json({
      message: 'User registration successful!',
      data: data[0],
    });
  } catch (err) {
    console.error('Unexpected error occurred during user creation', err);
    res.status(500).json({ message: 'An unexpected error has occurred' });
  }
};

export const logInUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // validate request body
    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required.' });
      return;
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, password_hash')
      .eq('username', username)
      .single();

    if (error) {
      console.error('Error fetching user', error);
      res.status(500).json({
        message: 'Internal server error. Please try again later.',
      });
      return;
    }

    if (!user) {
      res.status(401).json({ message: 'Invalid username or password.' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid username or password.' });
      return;
    }

    // Set JWT Token in cookie
    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
      },
      env.JWT_SECRET as string,
      {
        expiresIn: '48h',
      },
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 48 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'An unexpected error has occurred',
      error: err,
    });
  }
};
