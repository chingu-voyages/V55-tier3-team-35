import type { Request, Response } from 'express';

import prisma from '../database/db';
import { transactionSchema } from '../schemas/transactionSchema';

export const addTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const validationResult = transactionSchema.safeParse(req.body);
    if (!validationResult.success) {
      console.error('Zod schema validation failed', validationResult.error);
      res.status(400).json({
        message: 'Invalid input',
        error: validationResult.error.format(),
      });
      return;
    }

    const { name, amount, type, userId, categoryId } = validationResult.data;
    await prisma.transactions.create({
      data: {
        name: name,
        amount: amount,
        type: type,
        user_id: userId,
        category_id: categoryId,
        created_at: new Date(),
        updated_at: new Date(),
        transaction_date: new Date(),
      },
    });

    res.status(201).json({
      message: 'Transaction added successfully.',
    });
  } catch (err) {
    console.error('Error creating transaction:', err);
    res.status(500).json({
      message: 'Something went wrong while adding the transaction.',
    });
  }
};
