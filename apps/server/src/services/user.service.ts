import prisma from '../database/db';
import type { User } from '../schemas/updateUserSchema';

export const userService = {
  async updateUserDetails(user: User): Promise<void> {
    await prisma.users.update({
      where: { id: user.userId },
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        default_currency_id: user.defaultCurrencyId,
      },
    });
  },
};
