import type { NextFunction, Request, Response } from 'express';

import { env } from '../schemas/env';
import { budgetService } from '../services/budget.service';
import { budgetSchema } from './../schemas/budgetSchema';

export const createBudget = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationResult = budgetSchema.safeParse(req.body);
  try {
    if (!validationResult.success) {
      if (env.NODE_ENV !== 'production') {
        console.error('Zod Validation Error', validationResult.error.issues);
      }
      res.status(400).json({
        message: 'Invalid input',
        error:
          env.NODE_ENV !== 'production'
            ? validationResult.error.issues
            : undefined,
      });
      return;
    }

    const response = await budgetService.createBudget(validationResult.data);
    res
      .status(201)
      .json({ message: 'Transaction created successfully', data: response });
  } catch (err) {
    next(err);
  }
};
