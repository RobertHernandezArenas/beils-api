import { Router } from 'express';
import { userController } from './user.controller';
import { UserMiddleware } from './user.middleware';

export const UserRouter = Router()
	.post('/', UserMiddleware.validatorDataBody, userController.create)
	.post('/login', userController.login)
	.get('/', userController.findAll)
	.get('/:id', userController.findById);
