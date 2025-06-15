import prisma from '../database/db';
import type { Budget, UpdateBudget, BudgetResponse } from '../schemas/budgetSchema';
import type { Transaction } from '../schemas/transactionSchema';

interface CategoryWithName {
  id: number;
  name: string;
}

interface BudgetWithCategory extends Budget {
  categories: {
    name: string;
  };
}

interface TransactionWithCategory extends Transaction {
  categories: {
    id: number;
    name: string;
  };
}

export const budgetService = {
  async createBudget(data: Budget): Promise<BudgetResponse> {
    return await prisma.category_budgets.create({
      data: data,
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
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

  async getUserSpendings(userId: number, year: number, month: number) {
    const budgets = await prisma.category_budgets.findMany({
      where: {
        user_id: userId,
        year: year,
        month: month
      },
      include: {
        categories: {
          select: {
            name: true
          }
        }
      }
    }) as BudgetWithCategory[];

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const transactions = await prisma.transactions.findMany({
      where: {
        user_id: userId,
        transaction_date: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        categories: {
          select: {
            id: true,
            name: true
          }
        }
      }
    }) as TransactionWithCategory[];

    const allCategories = await prisma.categories.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        name: true
      }
    }) as CategoryWithName[];

    console.log('Available categories:', allCategories);
    console.log('Budget categories:', budgets.map((b: BudgetWithCategory) => ({ 
      id: b.category_id, 
      name: b.categories.name 
    })));
    console.log('Transaction categories:', transactions.map((t: TransactionWithCategory) => ({ 
      id: t.category_id, 
      name: t.categories.name 
    })));

    const budgetSpendings = budgets.map((budget: BudgetWithCategory) => {
      const categoryTransactions = transactions.filter(
        (transaction: TransactionWithCategory) => transaction.category_id === budget.category_id
      );

      const totalSpent = categoryTransactions.reduce((sum: number, t: TransactionWithCategory) => {
        const amount = typeof t.amount === 'string' ? 
          parseFloat(t.amount) : 
          parseFloat(t.amount.toString());
        return sum + amount;
      }, 0);

      return {
        categoryId: budget.category_id,
        categoryName: budget.categories.name,
        budgetAmount: Number(budget.budget_amount) || 0,
        spentAmount: totalSpent
      };
    });

    // Find transactions without matching budgets
    const budgetCategoryIds = new Set(budgets.map((b: BudgetWithCategory) => b.category_id));
    const unmatchedTransactions = transactions
      .filter((t: TransactionWithCategory) => !budgetCategoryIds.has(t.category_id))
      .map((t: TransactionWithCategory) => ({
        categoryId: t.category_id,
        categoryName: t.categories.name,
        amount: parseFloat(t.amount.toString()),
        transactionType: t.transaction_type_id === 1 ? 'expense' : 'income'
      }));

    return {
      budgets: budgetSpendings,
      unmatchedTransactions: unmatchedTransactions
    };
  },
};
