import cors from 'cors';
import express from 'express';
// import fileUpload from "express-fileupload";
import morgan from 'morgan';
import path from 'path';
import { buildLogger } from './utils/logger';
import { router } from './router';
import { sequelize } from './db/sequelize';
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
	.use(morgan(process.env.NODE_ENV ?? 'env'))
	.use(cors())
	// .use(fileUpload())
	.use(express.json())
	.use(express.urlencoded({ extended: true }))
	.use(express.static(path.join(__dirname, process.env.PUBLIC ?? 'public')))
	.use(router)
	.listen(process.env.PORT, () => {
		logger.log('Server is running at http://localhost:' + process.env.PORT);
	});

/*
UserModel.create({
	name: 'Alexandra',
	surname: 'Victoria',
	telephone: '608907985',
	email: 'alexa@email.com',
	password: '123456',
	role: 'admin',
	type_document: 'DNI',
	document_number: '48112071-G',
	gender: 'Mujer',
	nickname: 'Alexa591',
	avatar: 'avatar.jpg',
});

*/
