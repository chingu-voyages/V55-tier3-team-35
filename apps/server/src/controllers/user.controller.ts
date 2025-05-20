import type { Request, Response } from 'express';

import { supabase } from '../database/db';

export const createUser = (req: Request, res: Response): void => {
  console.log('creating user ...');
  res.json({ message: 'This route will create a new user.' });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  console.log('getting all users ...');
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    console.error('Error fetcing users:', error);
    res.status(500).json({ error: 'Fail to fetch users.' });
    return;
  }
  res.status(200).json(data);
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.params.id;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) {
    console.error(`Error fetching user with ID ${userId}`, error);
    res.status(404).json({ error: 'User not found.' });
    return;
  }
  res.status(200).json(data);
};

export const updateUser = (req: Request, res: Response): void => {
  res.json({ message: 'This route will update an existing user.' });
};

export const deleteUser = (req: Request, res: Response): void => {
  res.json({ message: 'This route will delete a user.' });
};
