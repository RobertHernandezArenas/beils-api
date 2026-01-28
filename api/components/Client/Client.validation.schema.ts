import { validateInput } from '@/adapters/zod';

export const validatorClientDataBody = validateInput();

export const ClientSchema = validatorClientDataBody.object({
	email: validatorClientDataBody
		.email({ error: 'El email no esta bien formado' })
		.nonempty('El email es obligatorio'),
	firstName: validatorClientDataBody.string().optional(),
	lastName: validatorClientDataBody.string().optional(),
	phone: validatorClientDataBody
		.string()
		.nonempty('El teléfono es obligatorio'),
	birthDate: validatorClientDataBody.date(),
	documentType: validatorClientDataBody.enum(['PASAPORTE', 'NIE', 'DNI']),
	documentNumber: validatorClientDataBody
		.string()
		.nonempty('El número de documento es obligatorio'),
	gender: validatorClientDataBody.string().optional().default('FEMALE'),
	address: validatorClientDataBody.string().optional(),
	city: validatorClientDataBody.string().optional().default('A CORUÑA'),
	postalCode: validatorClientDataBody.string().optional(),
	country: validatorClientDataBody.string().optional().default('SPAIN'),
});
