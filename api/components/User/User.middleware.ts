import { NextFunction, Request, Response } from 'express';
import {
	CreateUserSchema,
	validatorUserDataBody,
} from '@/components/User/User.schema';

export class UserMiddleware {
	static async validatorUserDataBody(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			// Validamos los datos del body usando el esquema definido
			await CreateUserSchema.parseAsync(request.body);

			// Si la validación es exitosa, continuamos al siguiente middleware o controlador
			return next();
		} catch (error) {
			if (error instanceof validatorUserDataBody.ZodError) {
				// Retornamos un 400 Bad Request con los detalles formateados
				return response.status(400).json({
					status: 'error',
					errors: error.issues, // Formato limpio: { email: ["Error..."] }
				});
			}
			return error;
		}
	}
}
