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
transactionRouter.patch('/:userId/transactions/:id', updateTransaction);
transactionRouter.delete('/:userId/transactions/:id', deleteTransaction);

export default transactionRouter;
