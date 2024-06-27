import cors from 'cors';
import express from 'express';
// import fileUpload from "express-fileupload";
import morgan from 'morgan';
import path from 'path';
import { buildLogger } from './utils/logger';
import { router } from './router';
import { sequelize } from './database/MYSQL/sequelize';
// import { UserModel } from './models/user.model';

const app = express();
const logger = buildLogger('app.ts');

try {
	sequelize.authenticate();
	sequelize.sync();
	logger.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

// APPLICATION CONFIG
export const appConfig = app
	.use(morgan('dev'))
	.use(cors())
	// .use(fileUpload())
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use(express.static(path.join(__dirname, 'public')))
	.use(router)
	.listen(process.env.PORT, () => {
		logger.log('Server is running at http://localhost:' + process.env.PORT);
	});
