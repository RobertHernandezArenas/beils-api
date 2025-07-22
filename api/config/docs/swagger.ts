import swaggerJSDOC from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Beils Belleza Honesta API',
		version: '1.0.0',
		description: 'Data bank for Beils Belleza Honesta',
		contact: {
			email: 'roberthernandezarenas@gmail.com',
		},
		license: {
			name: 'Apache 2.0',
			url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
		},
	},
	host: 'https://apieverywhere.com',
	basePath: '/api/v1',
	servers: [
		{
			url: `${process.env.SERVER1}/beils/v1/dev/`,
			description: 'Beils Development Server',
		},
		{
			url: `${process.env.SERVER1}/beils/v1/pro/`,
			description: 'Beils Production Server',
		},
	],
	components: {
		seccuritySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
		schemas: {
			userLoginDTO: {
				type: 'object',
				required: ['email', 'password'],
				properties: {
					email: {
						type: 'string',
					},
					password: {
						type: 'string',
					},
				},
			},
			userRegisterDTO: {
				type: 'object',
				required: ['name', 'surname', 'email', 'telephone'],
				properties: {
					name: {
						type: 'string',
					},
					surname: {
						type: 'string',
					},
					telephone: {
						type: 'string',
					},
					email: {
						type: 'string',
					},
					password: {
						type: 'string',
					},
					country: {
						type: 'string',
					},
					city: {
						type: 'string',
					},
					zip_code: {
						type: 'string',
					},
					address: {
						type: 'string',
					},
					role: {
						type: 'string',
					},
					dni: {
						type: 'string',
					},
					nie: {
						type: 'string',
					},
					passport: {
						type: 'string',
					},
					nickname: {
						type: 'string',
					},
					image: {
						type: 'string',
					},
				},
			},
		},
	},
};

const options = {
	swaggerDefinition,
	apis: ['src/router/*.ts'],
};

export const openAPIConfiguration = swaggerJSDOC(options);
