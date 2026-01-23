import { Request, Response, NextFunction } from 'express';
import { adapters } from '@/adapters';
import { CONFIG_GLOBALS } from '@/config';
import { UserModel } from './user.model';
import { buildLogger } from '@/utils/logger';
import { prismaClient } from '../../../lib/prisma';

const logger = buildLogger('user.controller.ts');

class UserController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const { email, password } = request.body;

			// validamos si el usuario ya existe
			// const userData = await UserModel.findOne({ where: { email } });
			const userData = await prismaClient.user.findUnique({
				where: { email },
			});

			if (userData) {
				// logger
				logger.error(`El usuario con email ${email} ya existe`);
				return response.status(409).json({
					error: {
						code: 409,
						type: 'CONFLICTO',
					},
				});
			}

			// creamos el usuario
			/* const user = await UserModel.create({
				email,
				password: await adapters.encrypt(password, 10),
				role: 'USER',
			});
 */

			const user = await prismaClient.user.create({
				data: {
					email,
					password: await adapters.encrypt(password, 10),
				},
			});

			// respondemos
			response.status(201).json({
				error: false,
				data: user,
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
				data: users /* users.map(user => {
					return {
						id: user.dataValues.id,
						email: user.dataValues.email,
						createdAt: user.dataValues.createdAt,
						updatedAt: user.dataValues.updatedAt,
					};
				}) */,
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
						code: 404,
						type: 'NO_ENCONTRADO',
					},
				});
			}
			response.status(200).json({
				data: {
					id: user.dataValues.id,
					email: user.dataValues.email,
					createdAt: user.dataValues.createdAt,
					updatedAt: user.dataValues.updatedAt,
				},
			});
		} catch (error) {
			next(error);
		}
	}

	async login(request: Request, response: Response, next: NextFunction) {
		try {
			const { email, password } = request.body;
			const user = await UserModel.findOne({ where: { email } });

			if (!user) {
				return response.status(401).json({
					error: {
						code: 401,
						type: 'NO_AUTORIZADO',
						message: 'Credenciales inválidas',
					},
				});
			}

			const isValidPassword = await adapters.encryptCompare(
				password,
				user.dataValues.password,
			);

			if (!isValidPassword) {
				return response.status(401).json({
					error: {
						code: 401,
						type: 'NO_AUTORIZADO',
						message: 'Credenciales inválidas',
					},
				});
			}

			const token = adapters.generateToken(
				{
					id: user.dataValues.id,
					email: user.dataValues.email,
				},
				CONFIG_GLOBALS.JWT.SECRET,
				CONFIG_GLOBALS.JWT.DURATION,
			);

			response.status(200).json({
				error: false,
				data: {
					user: {
						id: user.dataValues.id,
						email: user.dataValues.email,
					},
					token,
				},
			});
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
