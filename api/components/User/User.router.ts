import { Router } from 'express';
import { userController } from './user.controller';
import { UserMiddleware } from './user.middleware';

export const UserRouter = Router()
	.post('/', UserMiddleware.validatorDataBody, userController.create)
	.post('/login', userController.login)
	.get('/', userController.findAll)
	.get('/:id', userController.findById);
/*
	.post('/forgot-password', UserController.forgotPassword)
	.get('/', UserController.findAll)
	.get('/:id', userMiddleware.validateRole, UserController.findOne)
	.put(
		'/:id',
		userMiddleware.validateUserByID,
		userMiddleware.validatorDataBody,
		userMiddleware.validateDataToModify,
		UserController.update,
	)
	.delete('/:id', userMiddleware.validateUserByEmail, UserController.delete);
  */
