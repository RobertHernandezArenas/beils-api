import { Request, Response, NextFunction } from 'express';
import { adapters } from '@/adapters';
import { buildLogger } from '@/utils/logger';
import { prismaClient } from '../../../lib/prisma';

const logger = buildLogger('client.controller.ts');

class ClientController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const {
				firstName,
				lastName,
				email,
				phone,
				birthDate,
				gender,
				documentType,
				documentNumber,
				address,
				city,
				postalCode,
				country,
			} = request.body;

			if (email) {
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
			}

			const newClient = {
				email,
				firstName,
				lastName,
				phone,
				birthDate: birthDate ? new Date(birthDate) : undefined,
				document_type: !documentType ? 'DNI' : documentType,
				document_number: documentNumber,
				gender: !gender ? 'FEMALE' : gender,
				address,
				city: !city ? 'A CORUÑA' : city,
				postalCode,
				country: !country ? 'SPAIN' : country,
				isActive: true,
			};

			const client = await prismaClient.client.create({
				data: newClient,
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
			const { clientId } = request.params;
			const client = await prismaClient.client.findUnique({
				where: { clientId },
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
			const { clientId } = request.params;
			const { birthDate, documentType, documentNumber, ...rest } =
				request.body;

			const data = {
				...rest,
				...(birthDate && { birthDate: new Date(birthDate) }),
				...(documentType && { document_type: !documentType ? 'DNI' : documentType }),
				...(documentNumber && { document_number: documentNumber }),
			};

			const client = await prismaClient.client.update({
				where: { clientId },
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
			const { clientId } = request.params;
			await prismaClient.client.update({
				where: { clientId },
				data: { isActive: false },
			});
			response.status(204).send();
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async hardDelete(request: Request, response: Response, next: NextFunction) {
		try {
			const { clientId } = request.params;
			await prismaClient.client.delete({
				where: { clientId },
			});
			response.status(204).send();
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async restore(request: Request, response: Response, next: NextFunction) {
		try {
			const { clientId } = request.params;
			const client = await prismaClient.client.update({
				where: { clientId },
				data: { isActive: true },
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
