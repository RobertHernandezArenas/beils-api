import { Request, Response, NextFunction } from 'express';
import { adapters } from '@/adapters';
import { CONFIG_GLOBALS } from '@/config';

class UserController {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			response.status(201).json();
		} catch (error) {
			console.log('ERROR:::>', error);
			next(error);
		}
	}
}

export const userController = new UserController(); 
