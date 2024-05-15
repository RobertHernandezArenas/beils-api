import { NextFunction, Request, Response } from 'express';
import { userSchemas } from './schemas/user.validators.schemas';

export const userValidators = {
	create: async (request: Request, response: Response, next: NextFunction) => {
		try {
			const result = userSchemas.create.validate(request.body);

			if (!result.error) {
				return next();
			} else {
				const validationErrors = result.error.details.map(
					(error: { message: string }) => ({
						type: 'Validation error',
						description: error.message,
					}),
				);

				return response.status(400).json({
					status: 400,
					body: false,
					error: validationErrors,
				});
			}
		} catch (error) {
			next(error);
		}
	},
};
