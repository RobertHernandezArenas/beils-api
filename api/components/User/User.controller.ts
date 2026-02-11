import { Request, Response, NextFunction } from 'express';
import { buildLogger } from '@/utils/logger';
import { userService } from './User.service';
import { UserDTO } from './User.dto';
import { UserSchema } from './User.schema';

const logger = buildLogger('user.controller.ts');

class UserController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const data = request.body;
			const validatedData: UserDTO['create'] =
				await UserSchema.create.parseAsync(data);

			const user = await userService.create(validatedData);

			response.status(201).json({
				error: false,
				data: user,
			});
		} catch (error) {
			next(error);
		}
	}

	async findAll(request: Request, response: Response, next: NextFunction) {
		try {
			const users = await userService.findAll();

			response.status(200).json({
				data: { users },
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
			const { user_id } = request.params;
			const data = request.body;
			const validatedData: UserDTO['update'] =
				await UserSchema.update.parseAsync(data);

			const user = await userService.update(user_id, validatedData);

			response.status(200).json({
				data: user,
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async updateStatus(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const { user_id } = request.params;
			const data = request.body;
			const validatedData: UserDTO['updateStatus'] =
				await UserSchema.updateStatus.parseAsync(data);

			const user = await userService.updateStatus(user_id, validatedData);

			response.status(200).json({
				data: user,
				message: 'Estado de usuario actualizado correctamente',
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async delete(request: Request, response: Response, next: NextFunction) {
		try {
			const { user_id } = request.params;
			await userService.delete(user_id);
			response.status(204).send();
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async login(request: Request, response: Response, next: NextFunction) {
		try {
			const data = request.body;
			const validatedData: UserDTO['login'] =
				await UserSchema.login.parseAsync(data);

			const result = await userService.login(validatedData);

			response.status(200).json({
				error: false,
				data: result,
			});
		} catch (error) {
			next(error);
		}
	}

	async refreshToken(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const data = request.body;
			const validatedData: UserDTO['refreshToken'] =
				await UserSchema.refreshToken.parseAsync(data);

			const result = await userService.refreshToken(validatedData);

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
