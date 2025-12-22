import { Request, Response, NextFunction } from 'express';
import { adapters } from '@/adapters';
import { CONFIG_GLOBALS } from '@/config';
import { UserModel } from './user.model';

interface UserResponse{
	email: string;
	createdAt: string;
	updatedAt: string;
}

class UserController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const { email, password } = request.body;

			const user = await UserModel.create({
				email,
				password: await adapters.encrypt(password, 10),
				role: 'ADMIN',
			});

			const userResponse: UserResponse = user.dataValues

			response.status(201).json({
				error: false,
				data: userResponse
			});
		} catch (error) {
			console.log('ERROR:::>', error);
			next(error);
		}
	}

	async findAll(request: Request, response: Response, next: NextFunction) {
		try {
			const users = await UserModel.findAll();
			response.status(200).json({
				data: users.map(user => user.dataValues),
				meta: {
					total: users.length,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	async findById(request: Request, response: Response, next: NextFunction) {
		try {
			const { id } = request.params;
			const user = await UserModel.findByPk(id);

			if (!user) {
				return response.status(404).json({
					error: {
						code: 'RESOURCE_NOT_FOUND',
						message: `User with not found`,
					},
				});
			}
			response.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
