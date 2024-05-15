import express from 'express';
import { UserController } from '../controllers/user.controller';
import { userValidators } from '../middlewares/validators/user.validartors';
import { userMiddleware } from '../middlewares/user.middleware';

export const userRouter = express.Router();

userRouter
	.post('/create', userValidators.create, UserController.create)
	.get('/', UserController.findAll)
	.get('/search', UserController.findOne)
	.put('/update/:id', userMiddleware.checkUserExists, UserController.update)
	.delete('/delete/:id', userMiddleware.checkUserExists, UserController.delete);
