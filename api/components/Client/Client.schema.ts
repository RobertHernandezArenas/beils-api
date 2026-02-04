import { validateInput } from '@/adapters/zod';

export const validatorClientDataBody = validateInput();

export const ClientSchema = validatorClientDataBody.object({
	email: validatorClientDataBody
		.email({ error: 'El email no esta bien formado' })
		.nonempty('El email es obligatorio'),
	password: validatorClientDataBody
		.string()
		.nonempty('La contraseña es obligatoria'),
	name: validatorClientDataBody.string().nonempty('El nombre es obligatorio'),
	surname: validatorClientDataBody
		.string()
		.nonempty('El apellido es obligatorio'),
	mobile: validatorClientDataBody
		.string()
		.nonempty('El móvil es obligatorio'),
	phone: validatorClientDataBody.string().optional(),
	birthDate: validatorClientDataBody.coerce.date(),
	document_type: validatorClientDataBody.enum([
		'PASSPORT',
		'NIE',
		'DNI',
		'CIF',
	]),
	document_number: validatorClientDataBody
		.string()
		.nonempty('El número de documento es obligatorio'),
	gender: validatorClientDataBody.string().optional().default('FEMALE'),
	address: validatorClientDataBody.string().optional(),
	city: validatorClientDataBody.string().optional().default('A CORUÑA'),
	postalCode: validatorClientDataBody.string().optional(),
	country: validatorClientDataBody.string().optional().default('SPAIN'),
});
