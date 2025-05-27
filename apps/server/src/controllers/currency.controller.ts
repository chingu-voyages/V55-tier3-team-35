import type { Request, Response } from 'express';

import { currencyService } from '../services/currency.service';

export const listCurrencies = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const currencies = await currencyService.getAllCurrencies();
    if (currencies.length === 0) {
      res.status(200).json({ message: 'No currencies found.', data: [] });
    }
    res
      .status(200)
      .json({ message: 'Currencies retrieved successfully', data: currencies });
  } catch (err) {
    console.error('Error fetching currencies', err);
    res.status(500).json({
      message: 'Internal server error',
      error: 'Failed to get currencies.',
    });
  }
};
