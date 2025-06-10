import type { NextFunction, Request, Response } from 'express';

import { currencyService } from '../services/currency.service';

export const listCurrencies = async (
  _: Request,
  res: Response,
  next: NextFunction,
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
    next(err);
  }
};
