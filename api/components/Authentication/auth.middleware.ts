import { NextFunction, Request, Response } from 'express';
import { authSchema } from './auth.schema';
import { verifyToken } from '../../adapters/jwt';
import { Auth } from '.';

export class AuthMiddleware {
	static async validateDataBody(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const result = authSchema.validate(request.body, {
				abortEarly: false,
			});

			if (result.error) {
				return response.status(400).json({
					code: 400,
					status: 'error',
					type: result.error.details.map(error => error.message),
				});
			}

			return next();
		} catch (error) {
			return error;
		}
	}
	static async validateUserByEmail(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const { email } = request.body;
			const user = await Auth.model.findOne({ where: { email } });

			if (user) {
				return response.status(409).json({
					code: 409,
					status: 'error',
					type: 'CONFLICT',
				});
			}
			next();
		} catch (error) {
			next(error);
		}
	}
	static async validateUserByID(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const { id } = request.params;
			const user = await Auth.model.findByPk(id);

			if (!user) {
				return response.status(409).json({
					code: 409,
					status: 'error',
					type: 'CONFLICT',
				});
			}
			next();
		} catch (error) {
			next(error);
		}
	}
	static async validateDataToModify(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const { id } = request.params;
			const email = await Auth.model
				.findByPk(id)
				.then((x: any) => x?.dataValues.email);

			const userDataToVerify = request.body;

			if (email !== userDataToVerify.email) {
				return response
					.status(400)
					.json({ code: 409, status: 'error', type: 'CONFLICT' });
			}
			next();
		} catch (error) {
			next(error);
		}
	}
	static async validateRole(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			console.log(' AUTHORIZATION::::>', request.headers.authorization);
			const { authorization } = request.headers;

			if (!authorization) {
				console.log('1 if:::>');
				return response
					.status(401)
					.send({ code: 401, status: 'error', type: 'UNAUTHORIZED' });
			}

			const { user } = verifyToken(
				authorization.toString().split(' ')[1],
				'tiringuistinguis',
			);

			next();
		} catch (error) {
			next(error);
		}
	}
}
