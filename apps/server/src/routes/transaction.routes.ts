import { Router } from 'express';

import { createTransaction } from '../controllers/transaction.controller';

const transactionRouter = Router();

transactionRouter.post('/', createTransaction);

export default transactionRouter;
