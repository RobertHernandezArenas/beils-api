import { Client } from '@/components/Client';
import { User } from '@/components/User';
import { Request, Response, Router } from 'express';

export const APP_ROUTER = Router()
	.get('/', (request: Request, response: Response) => {
		response.json({ data: { message: 'Hello from the API!' } });
	})

	.use('/api/v1/user', User.Router)

	.use('/api/v1/client', Client.Router)

	.use('*', (request: Request, response: Response) => {
		response.status(404).json({
			error: {
				code: 404,
				type: 'NO_ENCONTRADO',
			},
			data: false,
		});
	})

	.use((error: Error, request: Request, response: Response) => {
		console.log(`[Server Error]: ${error.message}`);
		response.status(500).json({
			error: {
				code: 500,
				type: 'ERROR_INTERNO_DEL_SERVIDOR',
			},
		});
	});
