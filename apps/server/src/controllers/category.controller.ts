import type { NextFunction, Request, Response } from 'express';

import { categoryService } from '../services/category.service';

export const getUserCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
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

    const response = await categoryService.getUserCategories(userId);
    res.status(200).json({ data: response });
  } catch (err) {
    next(err);
  }
};
