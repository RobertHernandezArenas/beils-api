import { NextFunction, Request, Response } from 'express';
import { UserModel } from '../models/user.model';

export const userMiddleware = {
	checkUserExists: async (
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		try {
			const { id } = request.params;
			const user = await UserModel.findByPk(id);

			if (!user) {
				return response.status(404).json({ message: 'NOT_FOUND' });
			}
			next();
		} catch (error) {
			next(error);
		}
	},
};
