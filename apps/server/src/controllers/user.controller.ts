import type { NextFunction, Request, Response } from 'express';

import prisma from '../database/db';
import { updateUserSchema } from '../schemas/updateUserSchema';
import { userService } from '../services/user.service';

export const createUser = (req: Request, res: Response): void => {
  res.json({ message: 'This route will create a new user.' });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  console.log('getting all users ...');
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
    return;
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userIdString = req.params.id;
  if (!userIdString) {
    res.status(400).json({ error: 'User ID is required' });
    return;
  }
  const userId = parseInt(userIdString, 10);
  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid user ID format' });
    return;
  }

  try {
    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
    return;
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validationResult = updateUserSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        message: 'Invalid input',
        error: validationResult.error.format(),
      });
      return;
    }
    await userService.updateUserDetails(validationResult.data);
    res.status(200).json({ message: 'User profile updated successfully.' });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = (req: Request, res: Response): void => {
  res.json({ message: 'This route will delete a user.' });
};
