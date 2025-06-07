import prisma from '../database/db';
import type { Budget } from '../schemas/budgetSchema';

export const budgetService = {
  async createBudget(data: Budget) {
    return await prisma.category_budgets.create({
      data: data,
    });
  },
};
