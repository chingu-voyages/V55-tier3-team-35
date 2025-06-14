import { Router } from 'express';

import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transaction.controller';

const transactionRouter = Router();

transactionRouter.post('/', createTransaction);
transactionRouter.get('/:id/transactions', getTransactions);
transactionRouter.patch('/:id', updateTransaction);
transactionRouter.delete('/:id', deleteTransaction);

export default transactionRouter;