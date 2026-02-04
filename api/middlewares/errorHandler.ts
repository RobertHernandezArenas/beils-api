import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
	public readonly statusCode: number;
	public readonly isOperational: boolean;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

export const errorHandler = (
	err: AppError,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (err.isOperational) {
		return res.status(err.statusCode).json({
			data: false,
			error: { status: 'error', message: err.message },
		});
	}

	console.error('ERROR 💥', err);
	return res.status(500).json({
		data: false,
		error: { status: 'error', message: 'Something went wrong' },
	});
};
