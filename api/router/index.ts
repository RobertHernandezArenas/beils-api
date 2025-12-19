import { Auth } from '@/components/Authentication';
import { Customer } from '@/components/Customer';
import { CONFIG_GLOBALS } from '@/config';
import { NextFunction, Request, Response, Router } from 'express';

export const APP_ROUTER = Router()
	// .use('/api/v1/customer', Customer.router)
	.use('/', (req, res) => {
    res.json({ message: 'Hello from the API!' });
	})
  
  .use('/api/v1/auth', Auth.router)

	.use('*', (response: Response) => {
		response.status(404).json({
			error: {
				code: 404,
				message: 'Page not found',
			},
			data: false,
		});
	})

	.use(
		(
			error: Error,
			request: Request,
			response: Response,
			next: NextFunction,
		) => {
			console.log(`[Server Error]: ${error.message}`);
			response.status(500).json({
				error: 'Internal Server Error',
				details: 'Something went wrong on the server',
			});
		},
	);
