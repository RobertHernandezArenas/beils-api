import { userController } from "./User.controller";
import { UserMiddleware } from "./User.middleware";
import { UserRouter } from "./User.router";
import { UserSchema } from "./User.schema";


export const User = {
	Router: UserRouter,
	Controller: userController,
	Middleware: UserMiddleware,
	Schema: UserSchema,
};
