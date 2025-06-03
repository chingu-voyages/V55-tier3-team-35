import { Router } from 'express';

import {
  createTransaction,
  getTransactions,
} from '../controllers/transaction.controller';

const transactionRouter = Router();

transactionRouter.post('/', createTransaction);
transactionRouter.get('/:id', getTransactions);

export default transactionRouter;
