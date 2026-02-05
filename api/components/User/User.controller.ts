import { Request, Response, NextFunction } from 'express';
import { buildLogger } from '@/utils/logger';
import { userService } from './User.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './User.dto';
import {
	CreateUserSchema,
	LoginUserSchema,
	UpdateUserSchema,
} from './User.schema';

const logger = buildLogger('user.controller.ts');

class UserController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const data = request.body;
			const validatedData: CreateUserDto =
				await CreateUserSchema.parseAsync(data);

			const user = await userService.create(validatedData);

			response.status(201).json({
				error: false,
				data: user,
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async findAll(request: Request, response: Response, next: NextFunction) {
		try {
			const users = await userService.findAll();
			response.status(200).json({
				data: users,
				meta: {
					total: users.length,
				},
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async findById(request: Request, response: Response, next: NextFunction) {
		try {
			const { id } = request.params;
			const user = await userService.findById(id);
			response.status(200).json({
				data: user,
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const { id } = request.params;
			const data = request.body;
			const validatedData: UpdateUserDto =
				await UpdateUserSchema.parseAsync(data);

			const user = await userService.update(id, validatedData);

			response.status(200).json({
				data: user,
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async delete(request: Request, response: Response, next: NextFunction) {
		try {
			const { id } = request.params;
			await userService.delete(id);
			response.status(204).send();
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async login(request: Request, response: Response, next: NextFunction) {
		try {
			const data = request.body;
			const validatedData: LoginUserDto =
				await LoginUserSchema.parseAsync(data);

			const result = await userService.login(validatedData);

			response.status(200).json({
				error: false,
				data: result,
			});
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
