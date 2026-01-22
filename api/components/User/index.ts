import { userController } from './user.controller';
import { UserMiddleware } from './user.middleware';
import { UserModel } from './user.model';
import { UserRouter } from './user.router';
import { UserSchema } from './user.schema';

export const User = {
	Router: UserRouter,
	Controller: userController,
	Model: UserModel,
	Middleware: UserMiddleware,
	Schema: UserSchema,
};
