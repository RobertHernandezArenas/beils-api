import { ClientRepository } from './Client.repository';
import {
	Prisma,
	Client,
	document_type,
} from '@/generated/prisma/client/client';
import { AppError } from '../../middlewares/errorHandler';
import { CreateClientDto } from './Client.dto';

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
				throw new AppError('Email already exists', 409);
			}
		}

		const newClient: Prisma.ClientCreateInput = {
			email: data.email,
			firstName: data.firstName,
			lastName: data.lastName,
			phone: data.phone,
			birthDate: data.birthDate,
			document_type: data.document_type as document_type,
			document_number: data.document_number,
			gender: data.gender,
			address: data.address,
			city: data.city,
			postalCode: data.postalCode,
			country: data.country,
			isActive: true,
		};

		return this.clientRepository.create(newClient);
	}

	async findById(userId: string): Promise<Client> {
		const client = await this.clientRepository.findById(userId);
		if (!client) {
			throw new AppError('User not found', 404);
		}
		return client;
	}

	async findAll(): Promise<Client[]> {
		return this.clientRepository.findAll();
	}
}

export const clientService = new ClientService();
