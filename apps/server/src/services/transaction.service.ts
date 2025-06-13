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
  async getAllTransactions(userId: number): Promise<Transaction[]> {
    return await prisma.transactions.findMany({
      where: {
        user_id: userId,
      },
    });
  },
  async updateTransaction(transaction: Transaction): Promise<Transaction> {
    const { id, ...data } = transaction;
    return await prisma.transactions.update({
      where: {
        id: id,
      },
      data,
    });
  },
};
