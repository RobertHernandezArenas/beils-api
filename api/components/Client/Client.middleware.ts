import { NextFunction, Request, Response } from 'express';
import {
	ClientSchema,
	validatorClientDataBody,
} from '@/components/Client/Client.validation.schema';

export class ClientMiddleware {
	static async validatorClientDataBody(
		request: Request,
		response: Response,
		next: NextFunction,
	) {
		try {
			// Validamos los datos del body usando el esquema definido
			await ClientSchema.parseAsync(request.body);

			// Si la validación es exitosa, continuamos al siguiente middleware o controlador
			return next();
		} catch (error) {
			if (error instanceof validatorClientDataBody.ZodError) {
				// Retornamos un 400 Bad Request con los detalles formateados
				return response.status(400).json({
					status: 'error',
					errors: error.issues.map(issue => ({
						field: issue.path.join('.'),
						message: issue.message,
					})),
				});
			}
			return next(error);
		}
	}
}
