import prisma from '../database/db';
import type { Category } from '../schemas/categorySchema';

export const categoryService = {
  async getUserCategories(userId: number): Promise<Category[]> {
    return prisma.categories.findMany({
      where: {
        user_id: userId,
      },
    });
  },
};
