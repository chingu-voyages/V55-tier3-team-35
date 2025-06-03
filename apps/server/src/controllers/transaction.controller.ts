import type { NextFunction, Request, Response } from 'express';

import { env } from '../schemas/env';
import { transactionService } from '../services/transaction.service';
import {
  createTransactionSchema,
  getTransactionsSchema,
} from './../schemas/transactionSchema';

const createTransaction = async (
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

const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const validationResult = getTransactionsSchema.safeParse(req.params);
  try {
    if (!validationResult.success) {
      res.status(400).json({
        message: 'Invalid input',
        error: validationResult.error.issues,
      });
      return;
    }
    const response = await transactionService.getTransactions(Number(id));
    res
      .status(200)
      .json({ message: 'Transactions fetched successfully', data: response });
  } catch (err) {
    next(err);
  }
};

export { createTransaction, getTransactions };
