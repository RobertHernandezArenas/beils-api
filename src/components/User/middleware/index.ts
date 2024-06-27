import { NextFunction, Request, Response } from 'express';
import { userSchema } from '../schema';
import User from '../index';

export const userMiddleware = {
	validateDataBody: async (
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		try {
			const result = userSchema.validate(request.body, {
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
	},
	validateUserByEmail: async (
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		try {
			const { email } = request.body;
			const user = await User.model.findOne({ where: { email } });

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
	},
	validateUserByID: async (
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		try {
			const { id } = request.params;
			const user = await User.model.findByPk(id);

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
	},
	async validateDataToModify(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const { id } = request.params;
			const email = await User.model
				.findByPk(id)
				.then(x => x?.dataValues.email);

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
	},
};
