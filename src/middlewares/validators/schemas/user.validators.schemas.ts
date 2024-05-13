import Joi from 'joi';

export const userSchemas = {
	create: Joi.object({
		name: Joi.string().empty().min(3).max(30).required().messages({
			'string.empty': 'Name cannot be empty',
			'string.min': 'Name must have at least 3 numbers',
			'string.max': 'Name must not have more than 30 characters',
			'string.required': 'Name is mandatory',
		}),
		surname: Joi.string().empty().min(2).max(30).required().messages({
			'string.empty': 'Surname cannot be empty',
			'string.min': 'Surname must have at least 2 numbers',
			'string.max': 'Surname must not have more than 30 characters',
			'string.required': 'Surname is mandatory',
		}),
		telephone: Joi.string().empty().min(9).required().messages({
			'string.empty': 'Telephone cannot be empty',
			'string.min': 'Telephone must have at least 9 characters',
			'string.required': 'Telephone is mandatory',
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
			}),
	}),
};
