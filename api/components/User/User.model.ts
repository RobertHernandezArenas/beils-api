import { DataTypes } from '@sequelize/core';
import { sequelize } from '../../database/MYSQL/sequelize';
import { adapters } from '../../adapters';
import { CONFIG_GLOBALS } from '@/config';

const { USER } = CONFIG_GLOBALS.DATABASE.TABLES;

const userSequelizeSchema = {
	id: {
		type: DataTypes.STRING,
		unique: true,
		defaultValue: adapters.generateUUID(),
		primaryKey: true,
		allowNull: false,
	},
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
	password: {
		type: DataTypes.STRING,
	},
	role: {
		type: DataTypes.STRING,
		defaultValue: 'ADMIN',
	},
};

export const UserModel = sequelize.define(USER, userSequelizeSchema);
