import { customerController } from './customer.controller';

export const Customer =  {
	router: customerRouter,
	controller: customerController,
	model: customerModel,
	middleware: customerMiddleware,
	schema: customerSchema,
};
