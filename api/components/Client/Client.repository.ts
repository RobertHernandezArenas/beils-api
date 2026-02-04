import { Prisma, Client } from '@orm/prisma/generated/client';
import { prismaClient } from '@/config/database/orm/prisma';

export class ClientRepository {
	async create(data: Prisma.ClientCreateInput): Promise<Client> {
		return prismaClient.client.create({ data });
	}

	async findByEmail(email: string): Promise<Client | null> {
		return prismaClient.client.findUnique({ where: { email } });
	}

	async findById(client_id: string): Promise<Client | null> {
		return prismaClient.client.findUnique({ where: { client_id } });
	}

	async findAll(): Promise<Client[]> {
		return prismaClient.client.findMany();
	}

	async update(
		client_id: string,
		data: Prisma.ClientUpdateInput,
	): Promise<Client> {
		return prismaClient.client.update({ where: { client_id }, data });
	}

	async delete(client_id: string): Promise<Client> {
		return prismaClient.client.delete({ where: { client_id } });
	}
}
