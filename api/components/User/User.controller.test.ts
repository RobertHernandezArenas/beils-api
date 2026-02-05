import { userController } from './User.controller';
import { userService } from './User.service';
import { Request, Response } from 'express';
// Use unknown cast first to avoid conflict with jest.Mocked
const mockUserService = userService as unknown as jest.Mocked<
	typeof userService
>;

// Mock del Servicio
jest.mock('./User.service', () => ({
	userService: {
		create: jest.fn(),
		findAll: jest.fn(),
		findById: jest.fn(),
		update: jest.fn(),
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

			// Ahora tenemos intellisense completo y validación de tipos
			mockUserService.create.mockResolvedValue(mockUser as any);
			// as any en el retorno porque el User de Prisma tiene muchas props
			// pero podríamos hacer un helper mockUser(mockUser) similar al del service test

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
			mockUserService.create.mockRejectedValue(error);

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

			mockUserService.login.mockResolvedValue(mockResult as any);

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
			mockUserService.findById.mockResolvedValue(mockUser as any);

			await userController.findById(
				req as Request,
				res as Response,
				next,
			);

			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.json).toHaveBeenCalledWith({ data: mockUser });
		});
	});

	describe('delete', () => {
		it('debería retornar 204 y sin contenido', async () => {
			req.params = { id: '1' };
			mockUserService.delete.mockResolvedValue(undefined);

			await userController.delete(req as Request, res as Response, next);

			expect(res.status).toHaveBeenCalledWith(204);
			expect(res.send).toHaveBeenCalled();
		});
	});
});
