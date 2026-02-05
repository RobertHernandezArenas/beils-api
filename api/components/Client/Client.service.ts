import { ClientRepository } from './Client.repository';
import { Prisma, Client, DocumentType } from '@config/prisma/generated/client';
import { AppError } from '../../middlewares/errorHandler';
import { CreateClientDto, UpdateClientDto } from './Client.dto';
import { adapters } from '@/adapters';
import { buildLogger } from '@/utils/logger';

const logger = buildLogger('client.service.ts');

export class ClientService {
	private clientRepository: ClientRepository;

	constructor() {
		this.clientRepository = new ClientRepository();
	}

	async create(data: CreateClientDto): Promise<Client> {
		if (data.email) {
			const existingUser = await this.clientRepository.findByEmail(
				data.email,
			);
			if (existingUser) {
				logger.error(`Cliente duplicado: ${data.email}`);
				throw new AppError('CONFLICT', 409);
			}
		}

		const newClient: Prisma.ClientCreateInput = {
			email: data.email,
			password: await adapters.encrypt(data.password, 10),
			name: data.name,
			surname: data.surname,
			phone: data.phone,
			mobile: data.mobile,
			birth_date: data.birthDate,
			document_type: data.document_type as DocumentType,
			document_number: data.document_number,
			gender: data.gender,
			address: data.address,
			city: data.city,
			zip_code: data.postalCode,
			country: data.country,
			is_active: true,
		};

		return this.clientRepository.create(newClient);
	}

	async findById(userId: string): Promise<Client> {
		const client = await this.clientRepository.findAll({
			where: { client_id: userId },
			include: {
				consents: true,
				questionnaires: true,
				bonus: true,
				giftcards: true,
				debts: true,
				carts: true,
				bookings: true,
				revokes: true,
			},
		});

		if (!client[0]) {
			throw new AppError('Client not found', 404);
		}
		return client[0];
	}

	async findAll(name?: string): Promise<Client[]> {
		const where: Prisma.ClientWhereInput = {
			is_active: true,
		};

		if (name) {
			where.OR = [
				{ name: { contains: name } },
				{ surname: { contains: name } },
				{ email: { contains: name } },
				{ phone: { contains: name } },
			];
		}

		return this.clientRepository.findAll({
			where,
			include: {
				consents: true,
				questionnaires: true,
				bonus: true,
				giftcards: true,
				debts: true,
				carts: true,
				bookings: true,
				revokes: true,
			},
		});
	}

	async findInactive(name?: string): Promise<Client[]> {
		const where: Prisma.ClientWhereInput = {
			is_active: false,
		};

		if (name) {
			where.OR = [
				{ name: { contains: name } },
				{ surname: { contains: name } },
				{ email: { contains: name } },
				{ phone: { contains: name } },
			];
		}

		return this.clientRepository.findAll({
			where,
			include: {
				consents: true,
				questionnaires: true,
				bonus: true,
				giftcards: true,
				debts: true,
				carts: true,
				bookings: true,
				revokes: true,
			},
		});
	}

	async update(id: string, data: UpdateClientDto): Promise<Client> {
		const currentClient = await this.findById(id); // Validate existence

		const updateData: Prisma.ClientUpdateInput = {
			...data,
			birth_date: data.birthDate,
			zip_code: data.postalCode,
		};

		// Handle specific field mappings if they differ from DTO to Prisma
		// DTO has birthDate, postalCode. Prisma has birth_date, zip_code.
		if (data.birthDate) updateData.birth_date = data.birthDate;
		if (data.postalCode) updateData.zip_code = data.postalCode;

		// Encrypt password if updated
		if (data.password) {
			updateData.password = await adapters.encrypt(data.password, 10);
		}

		// Remove DTO fields that don't match Prisma directly if spread
		delete (updateData as any).birthDate;
		delete (updateData as any).postalCode;

		return this.clientRepository.update(id, updateData);
	}

	async delete(id: string): Promise<void> {
		await this.findById(id);
		await this.clientRepository.update(id, { is_active: false });
	}

	async hardDelete(id: string): Promise<void> {
		await this.findById(id);
		await this.clientRepository.delete(id);
	}

	async restore(id: string): Promise<Client> {
		await this.findById(id); // might return error if looking for active only?
		// Actually findById in service checks generic existence? No, it looks up in DB.
		// But findAll implementation in repo doesn't filter by active unless passed.
		// Service findById line 51 doesn't filter by active. Good.

		return this.clientRepository.update(id, { is_active: true });
	}
}

export const clientService = new ClientService();
