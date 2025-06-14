import prisma from '../database/db';
import type { Budget, UpdateBudget, BudgetResponse } from '../schemas/budgetSchema';

export const budgetService = {
  async createBudget(data: Budget): Promise<BudgetResponse> {
    return await prisma.category_budgets.create({
      data: data,
    });
  },

  async getBudgetById(id: number): Promise<BudgetResponse | null> {
    return await prisma.category_budgets.findFirst({
      where: { id },
    });
  },

  async getAllBudgets(userId: number): Promise<BudgetResponse[]> {
    return await prisma.category_budgets.findMany({
      where: { user_id: userId },
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
    });
  },

  async getBudgetByIdAndUserId(id: number, userId: number): Promise<BudgetResponse | null> {
    return await prisma.category_budgets.findFirst({
      where: { 
        id: id,
        user_id: userId 
      }
    });
  },

  async updateBudget(id: number, userId: number, data: UpdateBudget): Promise<BudgetResponse> {
    const existingBudget = await this.getBudgetByIdAndUserId(id, userId);
    if (!existingBudget) {
      throw new Error('Budget not found or does not belong to user');
    }
    return await prisma.category_budgets.update({
      where: {
        user_id_category_id_year_month: {
          user_id: userId,
          category_id: existingBudget.category_id,
          year: existingBudget.year,
          month: existingBudget.month
        }
      },
      data: data
    });
  },

  async deleteBudget(id: number, userId: number): Promise<BudgetResponse> {
    const existingBudget = await this.getBudgetByIdAndUserId(id, userId);
    if (!existingBudget) {
      throw new Error('Budget not found or does not belong to user');
    }

    return await prisma.category_budgets.delete({
      where: {
        user_id_category_id_year_month: {
          user_id: userId,
          category_id: existingBudget.category_id,
          year: existingBudget.year,
          month: existingBudget.month
        }
      }
    });
  },
};
