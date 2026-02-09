import { CONFIG_GLOBALS } from '@/config';
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
	servers: [
		{
			url: `${CONFIG_GLOBALS.SERVER}:${CONFIG_GLOBALS.PORT}${CONFIG_GLOBALS.API_SERVER_PREFIX}/${CONFIG_GLOBALS.API_SERVER_VERSION}`,
			description: `Beils ${CONFIG_GLOBALS.ENVIRONMENT} Server`,
		},
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
			},
		},
		schemas: {
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
			CreateUser: {
				type: 'object',
				required: ['email', 'password'],
				properties: {
					email: {
						type: 'string',
						format: 'email',
						description: 'Email address of the user',
						example: 'user@example.com',
					},
					password: {
						type: 'string',
						format: 'password',
						description: 'Password for the user account',
						example: 'securePassword123!',
					},
					role: {
						type: 'string',
						description: 'Role assigned to the user',
						default: 'ADMIN',
						example: 'ADMIN',
					},
				},
			},
			UpdateUser: {
				type: 'object',
				properties: {
					email: {
						type: 'string',
						format: 'email',
						description: 'Email address of the user',
						example: 'user@example.com',
					},
					password: {
						type: 'string',
						format: 'password',
						description: 'Password for the user account',
						example: 'newSecurePassword123!',
					},
					role: {
						type: 'string',
						description: 'Role assigned to the user',
						example: 'ADMIN',
					},
				},
			},
		},
	},
	security: [
		{
			bearerAuth: [],
		},
	],
};

const options = {
	swaggerDefinition,
	apis: ['./api/components/**/*.router.ts', './api/router/*.ts'],
};

export const openAPIConfiguration = swaggerJSDOC(options);
