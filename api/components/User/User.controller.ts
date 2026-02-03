import { Request, Response, NextFunction } from 'express';
import { adapters } from '@/adapters';
import { buildLogger } from '@/utils/logger';
import { prismaClient } from '../../../lib/prisma';
import { CONFIG_GLOBALS } from '@/config';

const logger = buildLogger('user.controller.ts');

class UserController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const body = request.body;

			// validamos si el usuario ya existe
			const userExist = await prismaClient.user.findUnique({
				where: { email: body.email },
			});

			if (userExist) {
				logger.error(`El usuario con email ${body.email} ya existe`);
				return response.status(409).json({
					error: {
						code: 409,
						type: 'CONFLICTO CON LA BASE DE DATOS',
					},
				});
			}

			const newUser = {
				email: body.email,
				password: await adapters.encrypt(body.password, 10),
				name: body.name,
				surname: body.surname,
        phone: body.phone,
        role: 'CLIENT',
				birthDate: body.birthDate
					? new Date(body.birthDate)
					: undefined,
				document_type: !body.documentType ? 'DNI' : body.documentType,
				document_number: body.documentNumber,
				gender: !body.gender ? 'FEMALE' : body.gender,
				address: body.address,
				city: !body.city ? 'A CORUÑA' : body.city,
				postalCode: body.postalCode,
				country: !body.country ? 'SPAIN' : body.country,
				isActive: true,
			};

			const user = await prismaClient.user.create({
				data: newUser,
			});

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
			const users = (await prismaClient.user.findMany()) || [];
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
			const { userId } = request.params;
			const user = await prismaClient.user.findUnique({
				where: { userId },
			});

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
					id: user.userId,
					email: user.email,
				},
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}
	async login(request: Request, response: Response, next: NextFunction) {
		try {
			const { email, password } = request.body;

			const user = await prismaClient.user.findUnique({
				where: { email },
			});

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
				user.password,
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
					id: user.userId,
					email: user.email,
				},
				CONFIG_GLOBALS.JWT.SECRET,
			);

			response.status(200).json({
				error: false,
				data: {
					user: {
						id: user.userId,
						email: user.email,
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
