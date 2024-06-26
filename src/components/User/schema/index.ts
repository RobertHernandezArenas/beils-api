import Joi from 'joi';

export const userSchema = Joi.object().keys({
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
	phone: Joi.number().integer().empty().min(9).messages({
		'number.empty': 'Phone cannot be empty',
		'number.min': 'Phone must have at least 9 characters',
		'number.required': 'Phone is mandatory',
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
	gender: Joi.string().valid('Hombre', 'Mujer').messages({
		'string.valid': 'Gender must be either Hombre or Mujer',
	}),
	password: Joi.string().min(6).max(20).optional(),
	country: Joi.string().max(20).optional(),
	city: Joi.string().max(20).optional(),
	zip_code: Joi.number().max(5).optional(),
	address: Joi.string().optional(),
	type_document: Joi.string().max(15).optional(),
	document_number: Joi.string()
		.pattern(new RegExp('^[a-zA-Z]+(-+|)|[0-9]{6,12}(-+|)[a-zA-Z]?$'))
		.min(9)
		.max(14)
		.optional(),
	birthdate: Joi.string()
		.pattern(new RegExp('^[0-9]{2}(-|/)[0-9]{2}(-|/)[0-9]{4}$'))
		.optional(),
	nickname: Joi.string().min(3).max(20).optional(),
	avatar: Joi.string().optional(),
});
