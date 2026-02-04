import { Prisma, Client } from '@/generated/prisma/client/client';
import { prismaClient } from '@config/prisma';

export class ClientRepository {
	async create(data: Prisma.ClientCreateInput): Promise<Client> {
		return prismaClient.client.create({ data });
	}

	async findByEmail(email: string): Promise<Client | null> {
		return prismaClient.client.findUnique({ where: { email } });
	}

	async findById(clientId: string): Promise<Client | null> {
		return prismaClient.client.findUnique({ where: { clientId } });
	}

	async findAll(): Promise<Client[]> {
		return prismaClient.client.findMany();
	}

	async update(
		clientId: string,
		data: Prisma.ClientUpdateInput,
	): Promise<Client> {
		return prismaClient.client.update({ where: { clientId }, data });
	}

	async delete(clientId: string): Promise<Client> {
		return prismaClient.client.delete({ where: { clientId } });
	}
}
