import { Router } from 'express';

import {
  logInUser,
  logOutUser,
  registerUser,
  checkAuthStatus,
} from '../controllers/auth.controller';
import requireAuth from '../middleware/auth';
import registerLimiter from '../utils/registerLimiter';
import userLimiter from '../utils/userLimiter';
const authRouter = Router();

authRouter.post('/register', registerLimiter, registerUser);
authRouter.post('/login', userLimiter(), logInUser);
authRouter.post('/logout', requireAuth, logOutUser);
authRouter.get('/status', checkAuthStatus);

export default authRouter;
