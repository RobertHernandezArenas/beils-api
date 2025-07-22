import { UserController } from './User.controller';
import { userMiddleware } from './User.middleware';
import { UserModel } from './User.model';
import { userRouter } from './User.router';
import { userSchema } from './User.schema';

export default {
	router: userRouter,
	controller: UserController,
	model: UserModel,
	middleware: userMiddleware,
	schema: userSchema,
};
