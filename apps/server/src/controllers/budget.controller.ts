import type { NextFunction, Request, Response } from 'express';

import { env } from '../schemas/env';
import { budgetService } from '../services/budget.service';
import { budgetSchema, updateBudgetSchema } from './../schemas/budgetSchema';

export const createBudget = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const validationResult = budgetSchema.safeParse(req.body);
  try {
    if (!validationResult.success) {
      if (env.NODE_ENV !== 'production') {
        console.error('Zod Validation Error', validationResult.error.issues);
      }
      res.status(400).json({
        message: 'Invalid input',
        error: env.NODE_ENV !== 'production' ? validationResult.error.issues : undefined,
      });
      return;
    }

    const response = await budgetService.createBudget(validationResult.data);
    res.status(201).json({ message: 'Budget created successfully', data: response });
  } catch (err) {
    next(err);
  }
};

export const getAllBudgets = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userIdString = req.params.userId;
    if (!userIdString) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const userId = parseInt(userIdString, 10);
    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID format' });
      return;
    }

    const budgets = await budgetService.getAllBudgets(userId);
    res.status(200).json({ message: 'Budgets retrieved successfully', data: budgets });
  } catch (err) {
    next(err);
  }
};

export const updateBudget = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id: idString, userId: userIdString } = req.params;
    if (!idString || !userIdString) {
      res.status(400).json({ error: 'Budget ID and User ID are required' });
      return;
    }

    const id = parseInt(idString, 10);
    const userId = parseInt(userIdString, 10);
    if (isNaN(id) || isNaN(userId)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    const validationResult = updateBudgetSchema.safeParse(req.body);
    if (!validationResult.success) {
      if (env.NODE_ENV !== 'production') {
        console.error('Zod Validation Error', validationResult.error.issues);
      }
      res.status(400).json({
        message: 'Invalid input',
        error: env.NODE_ENV !== 'production' ? validationResult.error.issues : undefined,
      });
      return;
    }

    try {
      const updatedBudget = await budgetService.updateBudget(id, userId, validationResult.data);
      res.status(200).json({ message: 'Budget updated successfully', data: updatedBudget });
    } catch (error) {
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

export const deleteBudget = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id: idString, userId: userIdString } = req.params;
    if (!idString || !userIdString) {
      res.status(400).json({ error: 'Budget ID and User ID are required' });
      return;
    }

    const id = parseInt(idString, 10);
    const userId = parseInt(userIdString, 10);
    if (isNaN(id) || isNaN(userId)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }

    try {
      const deletedBudget = await budgetService.deleteBudget(id, userId);
      res.status(200).json({ message: 'Budget deleted successfully', data: deletedBudget });
    } catch (error) {
      next(error);
    }
  } catch (err) {
    next(err);
  }
};