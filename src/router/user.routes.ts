import express from 'express';
import { UserController } from '../controllers/user.controller';
import { userValidators } from '../middlewares/validators/user.validartors';

export const userRouter = express.Router();

userRouter.post('/create', userValidators.create, UserController.create);
userRouter.get('/', UserController.findAll);
