import { Prisma, User } from '@config/prisma/generated/client';
import { prismaClient } from '@/config/prisma';

export class UserRepository {
	async create(data: Prisma.UserCreateInput): Promise<User> {
		return prismaClient.user.create({ data });
	}

	async findByEmail(email: string): Promise<User | null> {
		return prismaClient.user.findUnique({ where: { email } });
	}

	async findById(user_id: string): Promise<User | null> {
		return prismaClient.user.findUnique({ where: { user_id } });
	}

	async findAll(): Promise<User[]> {
		return prismaClient.user.findMany();
	}

	async update(user_id: string, data: Prisma.UserUpdateInput): Promise<User> {
		return prismaClient.user.update({ where: { user_id }, data });
	}

	async delete(user_id: string): Promise<User> {
		return prismaClient.user.delete({ where: { user_id } });
	}
}
