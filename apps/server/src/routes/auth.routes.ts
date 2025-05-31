import { Router } from 'express';

import {
  logInUser,
  logOutUser,
  registerUser,
} from '../controllers/auth.controller';
import requireAuth from '../middleware/auth';
import registerLimiter from '../utils/registerLimiter';
import userLimiter from '../utils/userLimiter';
const authRouter = Router();

authRouter.post('/register', registerLimiter, registerUser);
authRouter.post('/login', userLimiter(), logInUser);
authRouter.post('/logout', requireAuth, logOutUser);

export default authRouter;
