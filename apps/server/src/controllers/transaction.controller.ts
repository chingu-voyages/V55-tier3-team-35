import type { NextFunction, Request, Response } from 'express';

import { env } from '../schemas/env';
import type { Params } from '../schemas/paramsSchema';
import { transactionService } from '../services/transaction.service';
import {
  createTransactionSchema,
  transactionSchema,
} from './../schemas/transactionSchema';

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationResult = createTransactionSchema.safeParse(req.body);
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

    const response = await transactionService.createTransaction(
      validationResult.data,
    );
    res
      .status(201)
      .json({ message: 'Transaction created successfully', data: response });
  } catch (err) {
    next(err);
  }
};

export const getUserTransactions = async (
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

    const response = await transactionService.getAllTransactions(userId);
    res.status(200).json({ data: response });
  } catch (err) {
    next(err);
  }
};

export const updateTransaction = async (
  req: Request<Params>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const transactionIdString = req.params.id;

    const transactionId = parseInt(transactionIdString, 10);
    if (isNaN(transactionId)) {
      res.status(400).json({ error: 'Invalid transaction ID format' });
      return;
    }
    console.log(req.body);
    const validationResult = transactionSchema.safeParse(req.body);
    if (!validationResult.success) {
      res.status(400).json({
        message: 'Invalid input',
        error: validationResult.error.format(),
      });
      return;
    }

    const response = await transactionService.updateTransaction(
      validationResult.data,
    );
    res.status(200).json({ data: response });
  } catch (error) {
    console.error('Error updating transaction:', error);
    next(error);
  }
};
