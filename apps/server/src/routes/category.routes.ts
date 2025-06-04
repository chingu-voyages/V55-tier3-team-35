import { Router } from 'express';

import { getUserCategories } from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get('/user/:id', getUserCategories);

export default categoryRouter;
