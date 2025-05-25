import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { prisma } from '../database/db';
import { env } from '../schemas/env';
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

    const existingUser = await prisma.users.findUnique({
      where: { username },
      select: { id: true },
    });

    if (existingUser) {
      res.status(409).json({ message: 'Username already taken.' });
      return;
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds); // hash the password saltRound number of times

    const newUser = await prisma.users.create({
      data: {
        username,
        password_hash,
      },
      select: {
        id: true,
        username: true,
        created_at: true,
        default_currency_code: true,
      },
    });

    res.status(201).json({
      message: 'User registration successful!',
      data: newUser,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        res.status(409).json({
          message: 'Username already taken',
          error: 'Unique constraint violation',
        });
        return;
      }
    }
    res.status(500).json({ message: 'An unexpected error has occurred' });
  }
};

export const logInUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required.' });
      return;
    }

    // Look up user by username
    const user = await prisma.users.findUnique({
      where: { username },
      select: { id: true, username: true, password_hash: true },
    });

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
      error: err instanceof Error ? err.message : err,
    });
  }
};
