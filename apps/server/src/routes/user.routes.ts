import { Router } from 'express';

import { updateUser, getUserById } from '../controllers/user.controller';
import { asyncHandler } from './../middleware/asyncHandler';

const userRouter = Router();

userRouter.route('/me').patch(asyncHandler(updateUser)).get(getUserById);

export default userRouter;
