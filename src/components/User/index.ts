import { UserController } from './controller';
import { userMiddleware } from './middleware';
import { UserModel } from './model';
import { userRouter } from './routes';
import { userSchema } from './schema';

export default {
	router: userRouter,
	controller: UserController,
	model: UserModel,
	middleware: userMiddleware,
	schema: userSchema,
};
