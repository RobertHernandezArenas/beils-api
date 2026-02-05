import { validateInput } from '@/adapters/zod';

export const validatorUserDataBody = validateInput();

export const CreateUserSchema = validatorUserDataBody.object({
	email: validatorUserDataBody
		.email({ error: 'El email no esta bien formado' })
		.nonempty({ error: 'El email es obligatorio' }),
	password: validatorUserDataBody
		.string('La contraseña es obligatoria')
		.min(6, 'La contraseña debe tener al menos 6 caracteres')
		.max(36, 'La contraseña no debe exceder los 36 caracteres')
		.nonempty({ error: 'La contraseña no debe estar vacía' }),
	role: validatorUserDataBody.string().default('ADMIN'),
});

export const LoginUserSchema = validatorUserDataBody.object({
	email: validatorUserDataBody
		.email({ error: 'El email no esta bien formado' })
		.nonempty('El email es obligatorio'),
	password: validatorUserDataBody
		.string()
		.nonempty('La contraseña es obligatoria'),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const UserSchema = {
	CreateUserSchema,
	LoginUserSchema,
	UpdateUserSchema,
};

