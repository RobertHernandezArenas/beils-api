import { DataTypes } from '@sequelize/core';
import { sequelize } from '../../database/MYSQL/sequelize';
import { adapters } from '../../adapters';
import { CONFIG_GLOBALS } from '@/config';

const { USER } = CONFIG_GLOBALS.DATABASE.TABLES;

const userSequelizeSchema = {
	id: {
		type: DataTypes.STRING,
		unique: true,
		defaultValue: adapters.generateID(6),
		primaryKey: true,
		allowNull: false,
	},
	name: { type: DataTypes.STRING },
	surname: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
	password: {
		type: DataTypes.STRING,
	},
};

export const UserModel = sequelize.define(USER, userSequelizeSchema);
