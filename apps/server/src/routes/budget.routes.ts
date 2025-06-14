import { Router } from 'express';

import { 
  createBudget,
  getAllBudgets, 
  updateBudget, 
  deleteBudget, 
} from './../controllers/budget.controller';

const budgetRouter = Router();

budgetRouter.post('/', createBudget);
budgetRouter.get('/:userId', getAllBudgets);
budgetRouter.patch('/:userId/:id', updateBudget);
budgetRouter.delete('/:userId/:id', deleteBudget);

export default budgetRouter;
