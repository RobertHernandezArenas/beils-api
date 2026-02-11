import { userController } from './User.controller';
import { userService } from './User.service';
import { Request, Response } from 'express';

// Mock Prisma Client
jest.mock('../../config/prisma/generated/client', () => ({
	Prisma: {},
	Role: {
		ADMIN: 'ADMIN',
		USER: 'USER',
	},
	UserStatus: {
		ACTIVATED: 'ACTIVATED',
		DEACTIVATED: 'DEACTIVATED',
	},
}));

// Mock logger
jest.mock('../../utils/logger', () => ({
	buildLogger: jest.fn(() => ({
		error: jest.fn(),
		info: jest.fn(),
		log: jest.fn(),
		warn: jest.fn(),
	})),
}));

// Mock del Servicio
jest.mock('./User.service', () => ({
	userService: {
		create: jest.fn(),
		findAll: jest.fn(),
		findById: jest.fn(),
		update: jest.fn(),
		updateStatus: jest.fn(),
		delete: jest.fn(),
		login: jest.fn(),
	},
}));

describe('UserController', () => {
	let req: Partial<Request>;
	let res: Partial<Response>;
	let next: jest.Mock;

	beforeEach(() => {
		req = {
			body: {},
			params: {},
			query: {},
		};
		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn().mockReturnThis(),
			send: jest.fn().mockReturnThis(),
		} as unknown as Partial<Response>;
		next = jest.fn();

		jest.clearAllMocks();
	});

	describe('create', () => {
		it('debería retornar 201 y data al crear usuario', async () => {
			req.body = {
				email: 'new@test.com',
				password: 'password123',
				role: 'ADMIN',
			};
			const mockUser = { user_id: '1', ...req.body };

			(userService.create as jest.Mock).mockResolvedValue(mockUser);

			await userController.create(req as Request, res as Response, next);

			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.json).toHaveBeenCalledWith({
				error: false,
				data: mockUser,
			});
		});

		it('debería llamar a next con error si falla servico', async () => {
			req.body = { email: 'fail@test.com', password: 'password123' };
			const error = new Error('Service Error');
			(userService.create as jest.Mock).mockRejectedValue(error);

			await userController.create(req as Request, res as Response, next);

			expect(next).toHaveBeenCalledWith(error);
		});
	});

	describe('login', () => {
		it('debería retornar 200 y token', async () => {
			req.body = { email: 'login@test.com', password: 'password123' };
			const mockResult = {
				user: { user_id: '1', email: 'login@test.com' },
				token: 'abc',
			};

			(userService.login as jest.Mock).mockResolvedValue(mockResult);

			await userController.login(req as Request, res as Response, next);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				error: false,
				data: mockResult,
			});
		});
	});

	describe('findById', () => {
		it('debería retornar 200 y usuario', async () => {
			req.params = { id: '1' };
			const mockUser = { user_id: '1', email: 'test@test.com' };
			(userService.findById as jest.Mock).mockResolvedValue(mockUser);

			await userController.findById(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({ data: mockUser });
		});
	});

	describe('updateStatus', () => {
		it('debería retornar 200 y usuario actualizado', async () => {
			req.params = { user_id: '1' };
			req.body = { account_status: 'DEACTIVATED' };
			const mockUser = { user_id: '1', account_status: 'DEACTIVATED' };

			(userService.updateStatus as jest.Mock).mockResolvedValue(mockUser);

			await userController.updateStatus(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({
				data: mockUser,
				message: 'Estado de usuario actualizado correctamente',
			});
		});
	});

	describe('delete', () => {
		it('debería retornar 204 y sin contenido', async () => {
			req.params = { user_id: '1' };
			(userService.delete as jest.Mock).mockResolvedValue(undefined);

			await userController.delete(req as Request, res as Response, next);

			expect(res.status).toHaveBeenCalledWith(204);
			expect(res.send).toHaveBeenCalled();
		});
	});
});
