import { Prisma, Client } from '@config/prisma/generated/client';
import { prismaClient } from '@/config/prisma';

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

	async findAll(params?: {
		where?: Prisma.ClientWhereInput;
		include?: Prisma.ClientInclude;
	}): Promise<Client[]> {
		const { where, include } = params || {};
		return prismaClient.client.findMany({ where, include });
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
