import { UserService } from './User.service';
import { UserRepository } from './User.repository';
import { AppError } from '../../middlewares/errorHandler';
import { adapters } from '../../adapters';

// Mock the Prisma Client generated module to prevent valid ESM import issues in Jest
jest.mock('../../config/prisma/generated/client', () => ({
	Prisma: {},
	Role: {
		ADMIN: 'ADMIN',
		USER: 'USER',
	},
	// Mock other exports if needed
}));

// Using a local interface for User to simplify tests and avoid import issues with generated client.
interface User {
	user_id: string;
	email: string;
	password: string;
	role: any;
	is_active: boolean;
	created_at: Date;
	updated_at: Date;
}

const mockUser = (data: Partial<User>): any =>
	({
		user_id: 'default-id',
		email: 'default@test.com',
		password: 'hashed_password',
		role: 'ADMIN',
		is_active: true,
		created_at: new Date(),
		updated_at: new Date(),
		...data,
	}) as User;

// Mock del Repository (Clase completa) con factory para evitar cargar el archivo real
jest.mock('./User.repository', () => {
	return {
		UserRepository: jest.fn().mockImplementation(() => {
			return {
				create: jest.fn(),
				findByEmail: jest.fn(),
				findById: jest.fn(),
				findAll: jest.fn(),
				update: jest.fn(),
				delete: jest.fn(),
			};
		}),
	};
});

// Mock de dependencias externas
jest.mock('../../adapters', () => ({
	adapters: {
		encrypt: jest.fn(pass => Promise.resolve(`hashed_${pass}`)),
		encryptCompare: jest.fn((pass, hash) =>
			Promise.resolve(hash === `hashed_${pass}`),
		),
		generateToken: jest.fn(() => 'mock_token'),
	},
}));

jest.mock('../../utils/logger', () => ({
	buildLogger: jest.fn(() => ({
		error: jest.fn(),
		info: jest.fn(),
		log: jest.fn(),
		warn: jest.fn(),
	})),
}));

jest.mock('../../config', () => ({
	CONFIG_GLOBALS: {
		JWT: { SECRET: 'secret' },
	},
}));

describe('UserService', () => {
	let service: UserService;
	let mockRepo: jest.Mocked<UserRepository>;

	beforeEach(() => {
		jest.clearAllMocks();

		// Instanciar servicio
		service = new UserService();

		// Obtener la instancia del mock directamente del servicio
		mockRepo = (service as unknown as { userRepository: UserRepository })
			.userRepository as jest.Mocked<UserRepository>;
	});

	describe('create', () => {
		it('debería crear un usuario exitosamente con contraseña encriptada', async () => {
			const input = {
				email: 'test@test.com',
				password: 'password123',
			};

			// Configuramos el comportamiento del mock
			mockRepo.findByEmail.mockResolvedValue(null);
			mockRepo.create.mockResolvedValue(
				mockUser({
					user_id: '1',
					email: input.email,
					role: 'USER', // Default role
					password: 'hashed_password123',
				}),
			);

			const result = await service.create(input);

			expect(mockRepo.findByEmail).toHaveBeenCalledWith(input.email);
			expect(mockRepo.create).toHaveBeenCalledWith(
				expect.objectContaining({
					email: input.email,
					password: 'hashed_password123',
				}),
			);
			expect(result.password).toBe('hashed_password123');
		});

		it('debería lanzar error si el email ya existe', async () => {
			const input = {
				email: 'exist@test.com',
				password: 'password123',
			};
			mockRepo.findByEmail.mockResolvedValue(
				mockUser({ user_id: '1', ...input, role: 'ADMIN' }),
			);

			// Esperamos que lance error
			await expect(service.create(input)).rejects.toThrow(AppError);
		});
	});

	describe('login', () => {
		it('debería retornar usuario y token si credenciales son validas', async () => {
			const loginDto = {
				email: 'test@test.com',
				password: 'password123',
			};
			const storedUser = mockUser({
				user_id: '1',
				email: 'test@test.com',
				password: 'hashed_password123',
				role: 'ADMIN',
			});

			mockRepo.findByEmail.mockResolvedValue(storedUser);

			const result = await service.login(loginDto);

			expect(result.token).toBe('mock_token');
			expect(result.user.email).toBe(loginDto.email);
		});

		it('debería permitir login con contraseña en texto plano y actualizarla', async () => {
			const loginDto = {
				email: 'plain@test.com',
				password: 'plainPassword',
			};
			const storedUser = mockUser({
				user_id: 'p1',
				email: 'plain@test.com',
				password: 'plainPassword', // Stored as plain text
			});

			mockRepo.findByEmail.mockResolvedValue(storedUser);
			// First compare fails (bcrypt vs plain), second check (plain vs plain) passes
			(adapters.encryptCompare as jest.Mock).mockResolvedValueOnce(false);

			const result = await service.login(loginDto);

			expect(mockRepo.update).toHaveBeenCalledWith(
				'p1',
				expect.objectContaining({
					password: 'hashed_plainPassword',
				}),
			);
			expect(result.token).toBe('mock_token');
		});

		it('debería normalizar el email a minúsculas en login', async () => {
			const loginDto = {
				email: 'TEST@Test.com',
				password: 'password123',
			};
			const storedUser = mockUser({
				user_id: '1',
				email: 'test@test.com',
				password: 'hashed_password123',
				role: 'ADMIN',
			});

			mockRepo.findByEmail.mockResolvedValue(storedUser);

			const result = await service.login(loginDto);

			expect(mockRepo.findByEmail).toHaveBeenCalledWith('test@test.com');
			expect(result.user.email).toBe('test@test.com');
		});

		it('debería lanzar error si el usuario no existe', async () => {
			mockRepo.findByEmail.mockResolvedValue(null);
			await expect(
				service.login({ email: 'wrong@test.com', password: '123' }),
			).rejects.toThrow();
		});

		it('debería lanzar error si la contraseña es incorrecta', async () => {
			const storedUser = mockUser({
				user_id: '1',
				email: 'test@test.com',
				password: 'hashed_password123',
			});
			mockRepo.findByEmail.mockResolvedValue(storedUser);

			await expect(
				service.login({
					email: 'test@test.com',
					password: 'wrongpass',
				}),
			).rejects.toThrow();
		});
	});

	describe('update', () => {
		it('debería actualizar usuario y encriptar nueva contraseña', async () => {
			const userId = '1';
			const updateDto = { password: 'newPassword' };
			const existingUser = mockUser({
				user_id: '1',
				email: 'test@test.com',
				password: 'old',
			});

			mockRepo.findById.mockResolvedValue(existingUser);
			mockRepo.update.mockResolvedValue(
				mockUser({
					...existingUser,
					password: 'hashed_newPassword',
				}),
			);

			await service.update(userId, updateDto);

			expect(mockRepo.update).toHaveBeenCalledWith(
				userId,
				expect.objectContaining({
					password: 'hashed_newPassword',
				}),
			);
		});
	});

	describe('delete', () => {
		it('debería borrar usuario existente', async () => {
			mockRepo.findById.mockResolvedValue(mockUser({ user_id: '1' }));
			mockRepo.delete.mockResolvedValue(mockUser({ user_id: '1' }));

			await service.delete('1');

			expect(mockRepo.delete).toHaveBeenCalledWith('1');
		});

		it('debería lanzar error al intentar borrar usuario inexistente', async () => {
			mockRepo.findById.mockResolvedValue(null);
			await expect(service.delete('999')).rejects.toThrow();
		});
	});
});
