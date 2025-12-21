import { User } from '@/components/User';
import { Request, Response, Router } from 'express';

export const APP_ROUTER = Router()
	.get('/', (request: Request, response: Response) => {
		response.json({ message: 'Hello from the API!' });
	})

	.use('/api/v1/customer', User.router)

	.use('*', (request: Request, response: Response) => {
		response.status(404).json({
			error: {
				code: 404,
				name: 'NOT_FOUND',
			},
			data: false,
		});
	})

	.use((error: Error, request: Request, response: Response) => {
		console.log(`[Server Error]: ${error.message}`);
		response.status(500).json({
			error: 'Internal Server Error',
			details: 'Something went wrong on the server',
		});
	});
