import { Router } from 'express';
import { clientController } from './Client.controller';
import { ClientMiddleware } from './Client.middleware';

export const ClientRouter: Router = Router()
	.post(
		'/',
		ClientMiddleware.validatorClientDataBody,
		clientController.create,
	)
	.get('/', clientController.findAll)
	.get('/:id', clientController.findById);
