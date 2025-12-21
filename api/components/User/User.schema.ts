import { validate } from '@/adapters/joi';
const Joi = validate();

export const UserSchema = Joi.object().keys({
	name: Joi.string().empty().min(3).max(30).messages({
		'string.empty': 'Name cannot be empty',
		'string.min': 'Name must have at least 3 numbers',
		'string.max': 'Name must not have more than 30 characters',
		'string.required': 'Name is mandatory',
		'any.required': 'Name is required',
	}),
	surname: Joi.string().empty().min(2).max(30).messages({
		'string.empty': 'Surname cannot be empty',
		'string.min': 'Surname must have at least 2 numbers',
		'string.max': 'Surname must not have more than 30 characters',
		'string.required': 'Surname is mandatory',
	}),
	email: Joi.string()
		.email()
		.empty()
		.required()
		.pattern(new RegExp('^[.A-z0-9-_+]+@+[A-Za-z0-9-_=]+.[A-z]{3}$'))
		.messages({
			'string.email': 'Email is not well formed',
			'string.empty': 'Email cannot be empty',
			'string.pattern.base': 'Email is not well formed',
			'string.required': 'Email is mandatory',
			'any.required': 'Email is required',
		}),
});
