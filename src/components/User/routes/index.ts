import { Router } from 'express';
import { userMiddleware } from '../middleware';
import { UserController } from '../controller';

export const userRouter = Router();

userRouter
	.post(
		'/',
		userMiddleware.validateUserByEmail,
		userMiddleware.validateDataBody,
		UserController.create,
	)
	.get('/', UserController.findAll)
	.get('/:id', UserController.findOne)
	.put(
		'/:id',
		userMiddleware.validateUserByID,
		userMiddleware.validateDataBody,
		userMiddleware.validateDataToModify,
		UserController.update,
	)
	.delete('/:id', userMiddleware.validateUserByEmail, UserController.delete);
