import { clientController } from './Client.controller';
import { ClientRouter } from './Client.router';
import { ClientSchema } from './Client.validation.schema';

export const Client = {
	Router: ClientRouter,
	Controller: clientController,
	Schema: ClientSchema,
};
