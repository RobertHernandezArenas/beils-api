import { validateInput } from '@/adapters/joi';

const Joi = validateInput();

export const UserSchema = Joi.object().keys({
	email: Joi.string()
		.email()
		.empty()
		.required()
		.pattern(new RegExp('^[.A-z0-9-_+]+@+[A-Za-z0-9-_=]+.[A-z]{3}$'))
		.messages({
			'string.email': 'El email no esta  bien formado',
			'string.empty': 'El email no debe estar vacío',
			'string.pattern.base': 'El email no esta bien formado',
			'string.required': 'El email es obligatorio',
			'any.required': 'El email es obligatorio',
		}),
	password: Joi.string()
		.alphanum()
		.empty()
		.min(6)
		.max(16)
		.pattern(new RegExp('^[A-z0-9]{6,16}$'))
		.required()
		.trim()
		.messages({
			'string.alphanum':
				'La contraseña solo permite caracteres alfanúmericos',
			'string.empty': 'La contraseña no debe estar vacía',
			'string.min': 'La contraseña es muy corta',
			'string.max': 'La contraseña debe tener máximo 16 cáracteres',
			'string.pattern.base':
				'La contraseña debe de tener un mínimo de 6 y un máximo de 16 cáracteres',
			'string.required': 'El campo contraseña es obligatorio',
			'string.trim': 'La contraseña no debe contener espacios',
		}),
});
