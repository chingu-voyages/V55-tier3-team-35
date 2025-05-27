import { Router } from 'express';

import { listCurrencies } from '../controllers/currency.controller';
const currencyRouter = Router();

currencyRouter.get('/', listCurrencies);

export default currencyRouter;
