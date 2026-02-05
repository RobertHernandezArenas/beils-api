import { UserService } from './User.service';
import { UserRepository } from './User.repository';
import { AppError } from '../../middlewares/errorHandler';
import { User } from '@config/prisma/generated/client';

// Helper for type-safe mocks without partials
const mockUser = (data: Partial<User>): User => ({
	user_id: 'default-id',
	email: 'default@test.com',
	password: 'hashed_password',
	role: 'ADMIN',
	created_at: new Date(),
	updated_at: new Date(),
	...data,
});

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
jest.mock('@/adapters', () => ({
	adapters: {
		encrypt: jest.fn(pass => Promise.resolve(`hashed_${pass}`)),
		encryptCompare: jest.fn((pass, hash) =>
			Promise.resolve(hash === `hashed_${pass}`),
		),
		generateToken: jest.fn(() => 'mock_token'),
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
		// Hacemos cast a unknown primero para "romper" el tipado privado y luego al tipo correcto Jest Mock
		mockRepo = (service as unknown as { userRepository: UserRepository })
			.userRepository as jest.Mocked<UserRepository>;
	});

	describe('create', () => {
		it('debería crear un usuario exitosamente con contraseña encriptada', async () => {
			const input = {
				email: 'test@test.com',
				password: 'password123',
				role: 'ADMIN',
			};

			// Configuramos el comportamiento del mock
			mockRepo.findByEmail.mockResolvedValue(null);
			mockRepo.create.mockResolvedValue(
				mockUser({
					user_id: '1',
					email: input.email,
					role: input.role,
					password: 'hashed_password123',
				}),
			);

			const result = await service.create(input);

			expect(mockRepo.findByEmail).toHaveBeenCalledWith(input.email);
			expect(mockRepo.create).toHaveBeenCalled();
			expect(result.password).toBe('hashed_password123');
		});

		it('debería lanzar error si el email ya existe', async () => {
			const input = {
				email: 'exist@test.com',
				password: 'password123',
				role: 'ADMIN',
			};
			mockRepo.findByEmail.mockResolvedValue(
				mockUser({ user_id: '1', ...input }),
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

			expect(mockRepo.update).toHaveBeenCalled();
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
