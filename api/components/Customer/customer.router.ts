import { Router } from 'express';
import { CustomerController } from './customer.controller';


export const CustomerRouter = Router().post(
	'/',
	/* userMiddleware.validateUserByEmail,
		userMiddleware.validateDataBody, */
	CustomerController.create,
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
