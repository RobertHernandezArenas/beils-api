import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import { CONFIG_GLOBALS } from '@/config';
import { APP_ROUTER } from '@router/index';
import { errorHandler } from './middlewares/errorHandler';

import swaggerUi from 'swagger-ui-express';
import { openAPIConfiguration } from '@/config/docs/swagger';

express()
	.use(morgan('dev'))
	.use(cors())
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use(express.static(path.join(__dirname, 'public')))
	.use('/api/v1/', swaggerUi.serve, swaggerUi.setup(openAPIConfiguration))
	.use(APP_ROUTER)
	.use(errorHandler)
	.listen(CONFIG_GLOBALS.PORT, () =>
		console.log(
			`🚀 Server running: http://localhost:${CONFIG_GLOBALS.PORT}`,
		),
	);
