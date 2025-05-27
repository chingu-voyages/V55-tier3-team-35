import prisma from '../database/db';
import { type Currency } from './../schemas/currencySchema';

export const currencyService = {
  async getAllCurrencies(): Promise<Currency[]> {
    return await prisma.currencies.findMany({
      select: {
        name: true,
        symbol: true,
        code: true,
        id: true,
      },
    });
  },
};
