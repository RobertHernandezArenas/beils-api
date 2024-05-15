import { DataTypes, sql } from '@sequelize/core';
import { sequelize } from '../db/sequelize';

export const UserModel = sequelize.define('user', {
	id: {
		type: DataTypes.STRING,
		unique: true,
		defaultValue: sql.uuidV4,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	surname: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: 'España',
	},
	city: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: 'A Coruña',
	},
	zip_code: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	address: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'USER',
	},
	type_document: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: null,
	},
	document_number: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: true,
	},
	gender: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: 'Mujer',
	},
	birthdate: {
		type: DataTypes.DATE,
		allowNull: true,
	},
	nickname: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	avatar: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});
