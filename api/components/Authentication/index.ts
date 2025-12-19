import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { AuthModel } from './auth.model';
import { AuthRouter } from './auth.router';
import { authSchema } from './auth.schema';

export const Auth = {
	router: AuthRouter,
	controller: AuthController,
	model: AuthModel,
	middleware: AuthMiddleware,
	schema: authSchema,
};
