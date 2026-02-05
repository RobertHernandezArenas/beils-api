import { UserRepository } from './User.repository';
import { Prisma, User } from '@config/prisma/generated/client';
import { AppError } from '../../middlewares/errorHandler';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './User.dto';
import { adapters } from '@/adapters';
import { CONFIG_GLOBALS } from '@/config';
import { buildLogger } from '@/utils/logger';

const logger = buildLogger('user.service.ts');

export class UserService {
	private userRepository: UserRepository;

	constructor() {
		this.userRepository = new UserRepository();
	}

	async create(data: CreateUserDto): Promise<User> {
		const existingUser = await this.userRepository.findByEmail(data.email);
		if (existingUser) {
			logger.error(`El usuario con email ${data.email} ya existe`);
			throw new AppError('CONFLICT', 409);
		}

		const hashedPassword = await adapters.encrypt(data.password, 10);

		const newUser: Prisma.UserCreateInput = {
			email: data.email,
			password: hashedPassword,
			role: data.role || 'ADMIN',
		};

		return this.userRepository.create(newUser);
	}

	async findAll(): Promise<User[]> {
		return this.userRepository.findAll();
	}

	async findById(user_id: string): Promise<User> {
		const user = await this.userRepository.findById(user_id);
		if (!user) {
			throw new AppError('User not found', 404);
		}
		return user;
	}

	async update(user_id: string, data: UpdateUserDto): Promise<User> {
		const currentUser = await this.findById(user_id);

		const updateData: Prisma.UserUpdateInput = {};
		if (data.email) updateData.email = data.email;
		if (data.role) updateData.role = data.role;
		if (data.password) {
			updateData.password = await adapters.encrypt(data.password, 10);
		}

		return this.userRepository.update(user_id, updateData);
	}

	async delete(user_id: string): Promise<void> {
		await this.findById(user_id); // Ensure exists
		await this.userRepository.delete(user_id);
	}

	async login(
		data: LoginUserDto,
	): Promise<{ user: Partial<User>; token: string }> {
		const user = await this.userRepository.findByEmail(data.email);

		if (!user) {
			throw new AppError('Credenciales inválidas', 401);
		}

		const isValidPassword = await adapters.encryptCompare(
			data.password,
			user.password,
		);

		if (!isValidPassword) {
			throw new AppError('Credenciales inválidas', 401);
		}

		const token = adapters.generateToken(
			{
				id: user.user_id,
				email: user.email,
			},
			CONFIG_GLOBALS.JWT.SECRET,
		);

		return {
			user: {
				user_id: user.user_id,
				email: user.email,
				role: user.role,
			},
			token,
		};
	}
}

export const userService = new UserService();
