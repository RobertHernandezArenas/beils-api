import { Request, Response, NextFunction } from 'express';
import { adapters } from '@/adapters';
import { buildLogger } from '@/utils/logger';
import { prismaClient } from '../../../lib/prisma';

const logger = buildLogger('client.controller.ts');

class ClientController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const { email, password } = request.body;

			// validamos si el cliente ya existe
			const clientData = await prismaClient.client.findUnique({
				where: { email },
			});

			if (clientData) {
				logger.error(`El usuario con email ${email} ya existe`);
				return response.status(409).json({
					error: {
						code: 409,
						type: 'CONFLICTO',
					},
				});
			}

			const client = await prismaClient.client.create({
				data: {
					
				},
			});

			response.status(201).json({
				error: false,
				data: client,
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async findAll(request: Request, response: Response, next: NextFunction) {
		try {
			const clients = (await prismaClient.client.findMany()) || [];
			response.status(200).json({
				data: clients,
				meta: {
					total: clients.length,
				},
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async findById(request: Request, response: Response, next: NextFunction) {
		try {
			const { clientId } = request.params;
			const client = await prismaClient.client.findUnique({
				where: { clientId },
			});

			if (!client) {
				return response.status(404).json({
					error: {
						code: 404,
						type: 'NO_ENCONTRADO',
					},
				});
			}
			response.status(200).json({
				data: {
					id: client.clientId,
					email: client.email,
				},
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}
}

export const clientController = new ClientController();
