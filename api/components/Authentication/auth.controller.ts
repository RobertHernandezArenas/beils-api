import { Request, Response, NextFunction } from 'express';
import { AuthModel } from './auth.model';
import { AuthEntity } from './auth.entity';
import { AuthDTO } from './auth.dto'

export class AuthController {
	constructor() {}
	public async register(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			console.log('BODY:::>', request.body);
			const [error, authRegisterDTO] = AuthDTO.register(request.body);

			if (error) return response.status(400).json({ error });

			response.status(201).json({
				validation: authRegisterDTO,
				message: 'User registered successfully',
			});
		} catch (error) {
			console.log('ERROR:::>', error);
			next(error);
		}
	}

	login = async (
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		try {
			console.log('BODY:::>', request.body);
			response.status(201).json({
				message: 'User logged in successfully',
			});
		} catch (error) {
			console.log('ERROR:::>', error);
			next(error);
		}
	};
}
