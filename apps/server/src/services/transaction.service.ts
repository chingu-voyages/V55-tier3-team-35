import prisma from '../database/db';
import type {
  createTransactionInput,
  Transaction,
} from '../schemas/transactionSchema';

export const transactionService = {
  async createTransaction(
    transactionData: createTransactionInput,
  ): Promise<Transaction> {
    return await prisma.transactions.create({
      data: transactionData,
    });
  },
};
