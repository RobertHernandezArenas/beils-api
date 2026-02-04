import { Request, Response, NextFunction } from 'express';
import { buildLogger } from '@/utils/logger';
import { prismaClient } from '@/config/prisma';
import { ClientSchema } from './Client.schema';
import { clientService } from './Client.service';
import { CreateClientDto } from './Client.dto';

const logger = buildLogger('client.controller.ts');

class ClientController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const dataClient = request.body;
			const validatedData = await ClientSchema.parseAsync(dataClient);

			const client = await clientService.create(validatedData);

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
			const { name } = request.query;

			const where: {
				isActive: boolean;
				OR?: {
					firstName?: { contains: string };
					lastName?: { contains: string };
					email?: { contains: string };
					phone?: { contains: string };
				}[];
			} = {
				isActive: true,
			};

			if (name) {
				where.OR = [
					{
						firstName: {
							contains: name as string,
						},
					},
					{
						lastName: {
							contains: name as string,
						},
					},
					{
						email: {
							contains: name as string,
						},
					},
					{
						phone: {
							contains: name as string,
						},
					},
				];
			}

			const clients =
				(await prismaClient.client.findMany({
					where,
					include: {
						consents: true,
						questionnaires: true,
						bonus: true,
						giftcards: true,
						debts: true,
						carts: true,
						bookings: true,
						revokes: true,
					},
				})) || [];
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

	async findInactive(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			const { name } = request.query;

			const where: {
				isActive: boolean;
				OR?: {
					firstName?: { contains: string };
					lastName?: { contains: string };
					email?: { contains: string };
					phone?: { contains: string };
				}[];
			} = {
				isActive: false,
			};

			if (name) {
				where.OR = [
					{
						firstName: {
							contains: name as string,
						},
					},
					{
						lastName: {
							contains: name as string,
						},
					},
					{
						email: {
							contains: name as string,
						},
					},
					{
						phone: {
							contains: name as string,
						},
					},
				];
			}

			const clients =
				(await prismaClient.client.findMany({
					where,
					include: {
						consents: true,
						questionnaires: true,
						bonus: true,
						giftcards: true,
						debts: true,
						carts: true,
						bookings: true,
						revokes: true,
					},
				})) || [];
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
			const { client_id } = request.params;
			const client = await prismaClient.client.findUnique({
				where: { client_id },
				include: {
					consents: true,
					questionnaires: true,
					bonus: true,
					giftcards: true,
					debts: true,
					carts: true,
					bookings: true,
					revokes: true,
				},
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
				data: client,
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const { client_id } = request.params;
			const { birthDate, document_type, document_number, ...rest } =
				request.body;

			const data = {
				...rest,
				...(birthDate && { birthDate: new Date(birthDate) }),
				...(document_type && {
					document_type: !document_type ? 'DNI' : document_type,
				}),
				...(document_number && { document_number: document_number }),
			};

			const client = await prismaClient.client.update({
				where: { client_id },
				data,
			});
			response.status(200).json({
				data: client,
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async delete(request: Request, response: Response, next: NextFunction) {
		try {
			const { client_id } = request.params;
			await prismaClient.client.update({
				where: { client_id },
				data: { is_active: false },
			});
			response.status(204).send();
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async hardDelete(request: Request, response: Response, next: NextFunction) {
		try {
			const { client_id } = request.params;
			await prismaClient.client.delete({
				where: { client_id },
			});
			response.status(204).send();
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async restore(request: Request, response: Response, next: NextFunction) {
		try {
			const { client_id } = request.params;
			const client = await prismaClient.client.update({
				where: { client_id },
				data: { is_active: true },
			});
			response.status(200).json({
				data: client,
			});
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}
}

export const clientController = new ClientController();
