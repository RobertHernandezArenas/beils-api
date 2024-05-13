import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';
import { userResponses } from '../utils/messages/responses/user.responses';
import { encrypt } from '../utils/adapters/bcrypt';
import { buildLogger } from '../utils/logger';

const logger = buildLogger('user.controller.ts');

export const UserController = {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			await UserModel.create({
				name: request.body.name,
				surname: request.body.surname,
				telephone: request.body.telephone,
				email: request.body.email,
				password: await encrypt(
					request.body.password ?? process.env.PASSWORD,
					10,
				),
			});
			response.status(200).json(userResponses.create);
		} catch (error: unknown) {
			response.status(409).json({
				error: 'REGISTER_CONFLICT',
			});
			next(error);
		}
	},
	update() {},
	delete() {},
	async findAll(request: Request, response: Response, next: NextFunction) {
		try {
			response.status(200).json({
				data: await UserModel.findAll({}),
			});
		} catch (error) {
			response.status(400).json(error);
			next(error);
		}
	},
	findOne() {},
};
