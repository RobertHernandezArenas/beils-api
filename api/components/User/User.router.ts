import { userController } from './User.controller';
import { UserMiddleware } from './User.middleware';
import { Router } from 'express';

export const UserRouter: Router = Router()
	.post('/', UserMiddleware.validatorDataBody, userController.create)
	.post('/login', userController.login)
	.get('/', userController.findAll)
	.get('/:id', userController.findById);
