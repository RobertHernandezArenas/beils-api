import { UserSwaggerSchemas } from '@/components/User/User.schema';
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
		schemas: UserSwaggerSchemas,
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
