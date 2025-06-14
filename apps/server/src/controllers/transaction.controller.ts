import type { NextFunction, Request, Response } from 'express';

import { env } from '../schemas/env';
import type { Params } from '../schemas/paramsSchema';
import { transactionService } from '../services/transaction.service';
import {
  createTransactionSchema,
  getTransactionsSchema,
  updateTransactionBodySchema,
  transactionIdSchema,
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
  const validationResult = getTransactionsSchema.safeParse(req.params);
  try {
    if (!validationResult.success) {
      res.status(400).json({
        message: 'Invalid input',
        error: validationResult.error.issues,
      });
      return;
    }
    const response = await transactionService.getTransactions(
      validationResult.data.id,
    );
    res
      .status(200)
      .json({ message: 'Transactions fetched successfully', data: response });
  } catch (err) {
    next(err);
  }
};

const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const paramsValidation = transactionIdSchema.safeParse(req.params);
  const bodyValidation = updateTransactionBodySchema.safeParse(req.body);

  try {
    if (!paramsValidation.success) {
      res.status(400).json({
        message: 'Invalid parameters',
        error: paramsValidation.error.issues,
      });
      return;
    }

    if (!bodyValidation.success) {
      if (env.NODE_ENV !== 'production') {
        console.error('Zod Validation Error', bodyValidation.error.issues);
      }
      res.status(400).json({
        message: 'Invalid input',
        error:
          env.NODE_ENV !== 'production'
            ? bodyValidation.error.issues
            : undefined,
      });
      return;
    }

    const { id } = paramsValidation.data;
    const updateData = bodyValidation.data;

    const response = await transactionService.updateTransaction(id, updateData);
    res
      .status(200)
      .json({ message: 'Transaction updated successfully', data: response });
  } catch (err) {
    next(err);
  }
};

const deleteTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validationResult = transactionIdSchema.safeParse(req.params);

  try {
    if (!validationResult.success) {
      res.status(400).json({
        message: 'Invalid parameters',
        error: validationResult.error.issues,
      });
      return;
    }

    const { id } = validationResult.data;

    const response = await transactionService.deleteTransaction(id);
    res
      .status(200)
      .json({ message: 'Transaction deleted successfully', data: response });
  } catch (err) {
    next(err);
  }
};

export {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};