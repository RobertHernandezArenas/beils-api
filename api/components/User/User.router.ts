import { Router } from 'express';
import { userMiddleware } from './User.middleware';
import { UserController } from './User.controller';

export const userRouter = Router();
/**
que se suele guardar en un token jwt para cuestiones de login , teniendo en cuenta la seguridad de la app para no comprometer ningun dato a ciberataques

*/

userRouter
	.post(
		'/',
		userMiddleware.validateUserByEmail,
		userMiddleware.validateDataBody,
		UserController.create,
	)
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
