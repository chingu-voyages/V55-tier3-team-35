import { Router } from 'express';

import { createBudget } from './../controllers/budget.controller';

const budgetRouter = Router();

budgetRouter.post('/', createBudget);

export default budgetRouter;
