import { checkRole, isAuthenticated } from '@/middlewares/auth';
import { Router } from 'express';
import { clientController } from './Client.controller';

export const ClientRouter: Router = Router()
	.use(isAuthenticated, checkRole(['ADMIN']))
	.post('/', clientController.create)
	.get('/', clientController.findAll)
	.get('/inactive/all', clientController.findInactive)
	.get('/:clientId', clientController.findById)
	.patch('/:clientId', clientController.update)
	.delete('/:clientId', clientController.delete)
	.delete('/hard/:clientId', clientController.hardDelete)
	.patch('/restore/:clientId', clientController.restore);
