import prisma from '../database/db';
import type {
  createTransactionInput,
  updateTransactionInput,
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

  async getTransactions(id: number): Promise<Transaction[]> {
    return prisma.transactions.findMany({
      where: {
        user_id: id,
      },
      orderBy: [{ id: 'desc' }],
    });
  },

  async updateTransaction(
    userId: number,
    transactionId: number,
    updateData: updateTransactionInput,
  ): Promise<Transaction> {
    return prisma.transactions.update({
      where: {
        id: transactionId,
        user_id: userId,
      },
      data: updateData,
    });
  },

  async deleteTransaction(
    userId: number,
    transactionId: number,
  ): Promise<Transaction> {
    return prisma.transactions.delete({
      where: {
        id: transactionId,
        user_id: userId,
      },
    });
  },
};
