import { Router } from 'express';
import { userController } from './user.controller';

export const UserRouter = Router().post(
	'/',
	/* userMiddleware.validateUserByEmail,
		userMiddleware.validateDataBody, */
	
		userController.create,
);
/*
  .post('/login', UserController.login)
	.post('/forgot-password', UserController.forgotPassword)
	.get('/', UserController.findAll)
	.get('/:id', userMiddleware.validateRole, UserController.findOne)
	.put(
		'/:id',
		userMiddleware.validateUserByID,
		userMiddleware.validateDataBody,
		userMiddleware.validateDataToModify,
		UserController.update,
	)
	.delete('/:id', userMiddleware.validateUserByEmail, UserController.delete);
  */
