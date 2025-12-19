import { Router } from 'express';
import { AuthController } from './auth.controller';

const authController = new AuthController();

export const AuthRouter = Router();

AuthRouter.post('/register', authController.register);

AuthRouter.post(
	'/login',
	/* userMiddleware.validateUserByEmail,
		userMiddleware.validateDataBody, */
	authController.login,
);
