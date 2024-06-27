import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

export const sequelize = new Sequelize({
	database: process.env.MYSQL_DATABASE,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	host: process.env.MYSQL_HOST,
	port: Number(process.env.MYSQL_PORT),
	dialect: MySqlDialect,
	define: {
		timestamps: true,
	},
	pool: {
		max: Number(process.env.MYSQL_POOL_MAX),
		min: Number(process.env.MYSQL_POOL_MIN),
		acquire: Number(process.env.MYSQL_ACQUIRE),
		idle: Number(process.env.MYSQL_IDLE),
	},
});
