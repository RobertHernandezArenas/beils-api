import { Request, Response, NextFunction } from 'express';
import { buildLogger } from '@/utils/logger';
import { clientService } from './Client.service';
import { ClientSchema } from './Client.schema';
import { CreateClientDto, UpdateClientDto } from './Client.dto';

const logger = buildLogger('client.controller.ts');

class ClientController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const dataClient = request.body;
			const validatedData: CreateClientDto =
				await ClientSchema.parseAsync(dataClient);

			const client = await clientService.create(validatedData);

			response.status(201).json({
				error: false,
				data: client,
			});
		} catch (error) {
			next(error);
		}
	}

	async findAll(request: Request, response: Response, next: NextFunction) {
		try {
			const { name } = request.query;
			const clients = await clientService.findAll(name as string);

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
			const clients = await clientService.findInactive(name as string);

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
			// Note: router might use :clientId but controller reads :client_id.
			// Check router: .get('/:clientId', ...).
			// Controller MUST read request.params.clientId.
			// Previous code read `client_id` ???
			// Let's check previous router again.
			// Previous router: .get('/:clientId', clientController.findById)
			// Previous controller: const { client_id } = request.params;
			// If router defines :clientId, then params.client_id would be undefined!
			// I will fix this to use clientId (or better, match the param name).

			const id = request.params.clientId || request.params.client_id;

			const client = await clientService.findById(id);

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
			const id = request.params.clientId || request.params.client_id;
			const data = request.body;

			// Validate partial update
			const validatedData = await ClientSchema.partial().parseAsync(data);

			const client = await clientService.update(id, validatedData);

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
			const id = request.params.clientId || request.params.client_id;
			await clientService.delete(id);
			response.status(204).send();
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async hardDelete(request: Request, response: Response, next: NextFunction) {
		try {
			const id = request.params.clientId || request.params.client_id;
			await clientService.hardDelete(id);
			response.status(204).send();
		} catch (error) {
			logger.error((error as Error).message);
			next(error);
		}
	}

	async restore(request: Request, response: Response, next: NextFunction) {
		try {
			const id = request.params.clientId || request.params.client_id;
			const client = await clientService.restore(id);
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
