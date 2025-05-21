import { Router } from 'express';

import { registerUser } from '../controllers/auth.controller';
import registerLimiter from '../utils/registerLimiter';
const authRouter = Router();

authRouter.post('/register', registerLimiter, registerUser);

export default authRouter;
