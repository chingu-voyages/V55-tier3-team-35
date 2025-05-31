import type { Request, Response } from 'express';

import prisma from '../database/db';
import { updateUserSchema } from '../schemas/updateUserSchema';
import { userService } from '../services/user.service';

export const createUser = (req: Request, res: Response): void => {
  res.json({ message: 'This route will create a new user.' });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log('getting all users ...');
  try {
    const users = await prisma.users.findMany();
    res.status(200).json(users);
    return;
  } catch (error) {
    console.log('Failed to get users from database', error);
    res.status(500).json({ error: 'Fail to fetch users from the database.' });
    return;
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userIdString = req.params.id;
  console.log(`getting user info with id ${userIdString}`);
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
  } catch (error) {
    console.error('Error retrieving user info from database:', error);
    res.status(500).json({ error: 'Internal server error.' });
    return;
  }
};

export const updateUser = async (req: Request, res: Response) => {
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
};

export const deleteUser = (req: Request, res: Response): void => {
  res.json({ message: 'This route will delete a user.' });
};
