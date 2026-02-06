import { CONFIG_GLOBALS } from '@/config';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request to include user
declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}

export const isAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: 'No token provided' });
	}

	const token = authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, CONFIG_GLOBALS.JWT.SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Invalid token' });
	}
};

export const checkRole = (roles: string[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			return res.status(401).json({ message: 'User not authenticated' });
		}

		// Ensure role exists and is included in allowed roles
		if (!req.user.role || !roles.includes(req.user.role)) {
			return res
				.status(403)
				.json({ message: 'Access denied: Insufficient permissions' });
		}
		next();
	};
};
