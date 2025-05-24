import { Router } from 'express';

import { logInUser, registerUser } from '../controllers/auth.controller';
import registerLimiter from '../utils/registerLimiter';
import userLimiter from '../utils/userLimiter';
const authRouter = Router();

authRouter.post('/register', registerLimiter, registerUser);
authRouter.post('/login', userLimiter(), logInUser);

export default authRouter;
