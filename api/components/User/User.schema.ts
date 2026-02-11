import { validateInput } from '@/adapters/zod';
import { UserStatus } from '@/config/prisma/generated/client';

export const validatorUserDataBody = validateInput();

export const UserSchema = {
	create: validatorUserDataBody.object({
		email: validatorUserDataBody
			.email({ error: 'El email no esta bien formado' })
			.nonempty({ error: 'El email es obligatorio' }),
		password: validatorUserDataBody
			.string('La contraseña es obligatoria')
			.min(6, 'La contraseña debe tener al menos 6 caracteres')
			.max(36, 'La contraseña no debe exceder los 36 caracteres')
			.nonempty({ error: 'La contraseña no debe estar vacía' }),
	}),

	login: validatorUserDataBody.object({
		email: validatorUserDataBody
			.email({ error: 'El email no esta bien formado' })
			.nonempty('El email es obligatorio'),
		password: validatorUserDataBody
			.string()
			.nonempty('La contraseña es obligatoria'),
	}),

	update: validatorUserDataBody.object({
		password: validatorUserDataBody
			.string('La contraseña es obligatoria')
			.min(6, 'La contraseña debe tener al menos 6 caracteres')
			.max(36, 'La contraseña no debe exceder los 36 caracteres')
			.nonempty({ error: 'La contraseña no debe estar vacía' }),
	}),

	updateStatus: validatorUserDataBody.object({
		account_status: validatorUserDataBody.nativeEnum(UserStatus),
	}),

	refreshToken: validatorUserDataBody.object({
		refresh_token: validatorUserDataBody
			.string('El refresh token es obligatorio')
			.nonempty('El refresh token no debe estar vacío'),
	}),
};

export const UserSwaggerSchemas = {
	User: {
		type: 'object',
		properties: {
			user_id: {
				type: 'string',
				description: 'Unique identifier for the user',
				example: '123e4567-e89b-12d3-a456-426614174000',
			},
			email: {
				type: 'string',
				format: 'email',
				description: 'Email address of the user',
				example: 'user@example.com',
			},
			role: {
				type: 'string',
				description: 'Role assigned to the user',
				default: 'ADMIN',
				example: 'ADMIN',
			},
			account_status: {
				type: 'string',
				description: 'Account status of the user',
				default: 'ACTIVATED',
				example: 'ACTIVATED',
			},
			created_at: {
				type: 'string',
				format: 'date-time',
				description: 'Timestamp when the user was created',
				example: '2023-01-01T00:00:00.000Z',
			},
			updated_at: {
				type: 'string',
				format: 'date-time',
				description: 'Timestamp when the user was last updated',
				example: '2023-01-01T00:00:00.000Z',
			},
		},
	},
};
