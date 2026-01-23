import { CONFIG_GLOBALS } from '../config';
import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

export const sequelize = new Sequelize({
	database: 'beils_db',
	user: CONFIG_GLOBALS.DATABASE.MYSQL.USERNAME,
	password: CONFIG_GLOBALS.DATABASE.MYSQL.PASSWORD,
	host: CONFIG_GLOBALS.DATABASE.MYSQL.HOST,
	port: Number(CONFIG_GLOBALS.DATABASE.MYSQL.PORT),
	dialect: MySqlDialect,
	define: {
		timestamps: true,
	},
	pool: {
		max: Number(CONFIG_GLOBALS.DATABASE.MYSQL.POOL_MAX),
		min: Number(CONFIG_GLOBALS.DATABASE.MYSQL.POOL_MIN),
		acquire: Number(CONFIG_GLOBALS.DATABASE.MYSQL.ACQUIRE),
		idle: Number(CONFIG_GLOBALS.DATABASE.MYSQL.IDLE),
	},
});
