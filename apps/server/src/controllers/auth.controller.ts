import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { NextFunction, Request, Response } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

import { prisma } from '../database/db';
import { env } from '../schemas/env';
import { registerSchema } from '../schemas/registerSchema';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
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
        default_currency_id: true,
      },
    });
    const templateCategories = await prisma.category_templates.findMany();
    if (!templateCategories.length) {
      throw new Error('No template categories found.');
    }
    const userCategoryData = templateCategories.map((template) => ({
      name: template.name,
      is_user_created: false,
      user_id: newUser.id,
    }));

    const createdCategories = await prisma.categories.createMany({
      data: userCategoryData,
    });

    if (createdCategories.count != templateCategories.length) {
      console.warn(
        `Expected to create ${templateCategories.length} categories, but only created ${createdCategories.count}`,
      );
    }
    // Generate JWT token for the newly registered user
    const token = jwt.sign(
      {
        userId: newUser.id,
        username: newUser.username,
      },
      env.JWT_SECRET as string,
      {
        expiresIn: '48h',
      },
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: process.env.CLIENT_HOST === 'ALLOW_ALL' ? 'none' : 'strict',
      maxAge: 48 * 60 * 60 * 1000,
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 48 * 60 * 60 * 1000, // 48 hours
    });

    res.status(201).json({
      message: 'User registration successful!',
      user: {
        id: newUser.id,
        username: newUser.username,
      },
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
    console.error('Unexpected error occurred', err);
    next(err);
  }
};

export const logInUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
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
      select: {
        id: true,
        username: true,
        password_hash: true,
        default_currency_id: true,
      },
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
      sameSite: process.env.CLIENT_HOST === 'ALLOW_ALL' ? 'none' : 'strict',
      maxAge: 48 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: 'Login successful!',
      user: {
        id: user.id,
        username: user.username,
        defaultCurrencyId: user.default_currency_id,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const logOutUser = (_: Request, res: Response): void => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: process.env.CLIENT_HOST === 'ALLOW_ALL' ? 'none' : 'strict',
    secure: env.NODE_ENV === 'production',
  });
  console.log('User logged out successfully');
  res.status(200).json({ message: 'Logged out' });
};

export const checkAuthStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Extract token from cookie
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({
        message: 'No authentication token found.',
        isAuthenticated: false,
      });
      return;
    }

    // Verify JWT token
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, env.JWT_SECRET as string) as JwtPayload;
    } catch (jwtError) {
      res.status(401).json({
        message: 'Invalid or expired authentication token.',
        isAuthenticated: false,
      });
      console.error('Error decoding JWT payload', jwtError);
      return;
    }

    // Fetch user data from database to ensure user still exists
    const user = await prisma.users.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        default_currency_id: true,
        created_at: true,
      },
    });

    if (!user) {
      // User no longer exists in database
      res.status(401).json({
        message: 'User account not found.',
        isAuthenticated: false,
      });
      return;
    }

    let defaultCurrency = null;
    if (user.default_currency_id) {
      defaultCurrency = await prisma.currencies.findUnique({
        where: { id: user.default_currency_id },
        select: {
          id: true,
          code: true,
          name: true,
          symbol: true,
        },
      });
    }

    // Authentication successful - return user data
    res.status(200).json({
      message: 'Authentication valid.',
      isAuthenticated: true,
      user: {
        id: user.id,
        username: user.username,
        defaultCurrencyId: user.default_currency_id,
        createdAt: user.created_at,
      },
      default_currency: defaultCurrency,
    });
  } catch (err) {
    console.error('Error checking auth status:', err);
    next(err);
  }
};
