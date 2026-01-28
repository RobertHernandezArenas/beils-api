import { Router } from 'express';
import { clientController } from './Client.controller';
import { ClientMiddleware } from './Client.middleware';

export const ClientRouter: Router = Router()
	.post(
		'/',
		clientController.create,
	)
	.get('/', clientController.findAll)
	.get('/inactive/all', clientController.findInactive)
	.get('/:clientId', clientController.findById)
	.patch('/:clientId', ClientMiddleware.validatorClientDataBody, clientController.update)
	.delete('/:clientId', clientController.delete)
	.delete('/hard/:clientId', clientController.hardDelete)
	.patch('/restore/:clientId', clientController.restore);
