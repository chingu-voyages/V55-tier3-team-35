import { Router } from 'express';

import { getUserTransactions } from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/:id', getUserTransactions);

export default categoryRouter;
