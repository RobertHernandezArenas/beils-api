import { validateInput } from '@/adapters/zod';

export const validatorDataBody = validateInput();

export const UserSchema = validatorDataBody.object({
	email: validatorDataBody
		.email({ error: 'El email no esta bien formado' })
		.nonempty({ error: 'El email es obligatorio' }),
	password: validatorDataBody
		.string('La contraseña es obligatoria')
		.min(6, 'La contraseña debe tener al menos 6 caracteres')
		.max(36, 'La contraseña no debe exceder los 36 caracteres')
		.nonempty({ error: 'La contraseña no debe estar vacía' }),
});
