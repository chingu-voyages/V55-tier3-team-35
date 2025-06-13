import { Router } from 'express';

import {
  createTransaction,
  getUserTransactions,
  updateTransaction,
} from '../controllers/transaction.controller';

const transactionRouter = Router();

transactionRouter.post('/', createTransaction);
transactionRouter.get('/user/:id', getUserTransactions);
transactionRouter.patch('/:id', updateTransaction);
export default transactionRouter;
