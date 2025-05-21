import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { z } from 'zod/v4';

import { supabase } from '../database/db';

const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character',
    ),
});

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
      .select('id, username, created_at');

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
