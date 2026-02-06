import { Client } from '@/components/Client';
import { User } from '@/components/User';
import { CONFIG_GLOBALS } from '@/config';
import { Request, Response, Router } from 'express';

const API_PREFIX = `${CONFIG_GLOBALS.API_SERVER_PREFIX}/${CONFIG_GLOBALS.API_SERVER_VERSION}`;

export const APP_ROUTER = Router()
	.get('/', (request: Request, response: Response) => {
		response.redirect(`${API_PREFIX}/docs`);
	})

	.use(`${API_PREFIX}/user`, User.Router)

	.use(`${API_PREFIX}/client`, Client.Router);
