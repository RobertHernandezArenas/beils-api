import { validateInput } from '@/adapters/zod';

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
};
