import { Router } from 'express';

import { 
  createBudget,
  getAllBudgets, 
  updateBudget, 
  deleteBudget, 
  getUserSpendings,
} from './../controllers/budget.controller';

const budgetRouter = Router();

budgetRouter.post('/', createBudget);
budgetRouter.get('/user/:userId', getAllBudgets);
budgetRouter.get('/user/:userId/spendings', getUserSpendings);
budgetRouter.patch('/:id/user/:userId', updateBudget);
budgetRouter.delete('/:id/user/:userId', deleteBudget);

export default budgetRouter;
