import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../generated/prisma/client';
import { CONFIG_GLOBALS } from '../api/config/index';

const adapter = new PrismaMariaDb({
	host: CONFIG_GLOBALS.DATABASE.MYSQL.HOST,
	user: CONFIG_GLOBALS.DATABASE.MYSQL.USERNAME,
	password: CONFIG_GLOBALS.DATABASE.MYSQL.PASSWORD,
	database: CONFIG_GLOBALS.DATABASE.MYSQL.DB_NAME,
	connectionLimit: CONFIG_GLOBALS.DATABASE.MYSQL.POOL_MAX,
});

export const prismaClient = new PrismaClient({ adapter });
