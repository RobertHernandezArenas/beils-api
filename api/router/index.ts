import { Client } from '@/components/Client';
import { User } from '@/components/User';
import { Request, Response, Router } from 'express';

export const APP_ROUTER = Router()
	.get('/', (request: Request, response: Response) => {
		response.redirect('/api/v1/docs');
	})

	.use('/api/v1/user', User.Router)

	.use('/api/v1/client', Client.Router);