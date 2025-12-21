import { CONFIG_GLOBALS } from '@/config';

import { sequelize } from '@/database/MYSQL/sequelize';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { APP_ROUTER } from '@router/index';

try {
	sequelize.authenticate();
	sequelize.sync();
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

/**/

export const appConfig = express()
	.use(morgan('dev'))
	.use(cors())
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use(express.static(path.join(__dirname, 'public')))
	.use(APP_ROUTER)
	.listen(CONFIG_GLOBALS.PORT, () =>
		console.log(
			`🚀 Server running: http://localhost:${CONFIG_GLOBALS.PORT}`,
		),
	);
