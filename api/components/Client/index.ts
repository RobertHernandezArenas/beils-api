import { clientController } from './Client.controller';
import { ClientMiddleware } from './Client.middleware';
import { ClientRouter } from './Client.router';
import { ClientSchema } from './Client.validation.schema';

export const Client = {
	Router: ClientRouter,
	Controller: clientController,
	Middleware: ClientMiddleware,
	Schema: ClientSchema,
};
