import { Router } from 'express';

import {
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
  getUserById,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter
  .route('/users')
  .get(getAllUsers)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser);

userRouter.route('/users/:id').get(getUserById);

export default userRouter;
