import { DataTypes } from '@sequelize/core';
import { sequelize } from '../../../database/MYSQL/sequelize';
import { adapters } from '../../../utils/adapters';

const userSchema = {
	id: {
		type: DataTypes.STRING,
		unique: true,
		defaultValue: adapters.generateID(10),
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
	},
	surname: {
		type: DataTypes.STRING,
	},
	phone: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,

		defaultValue: '123456',
	},
	country: {
		type: DataTypes.STRING,

		defaultValue: 'SPAIN',
	},
	city: {
		type: DataTypes.STRING,

		defaultValue: 'A CORUÑA',
	},
	zip_code: {
		type: DataTypes.STRING,
	},
	address: {
		type: DataTypes.STRING,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'USER',
	},
	type_document: {
		type: DataTypes.STRING,

		defaultValue: 'DNI',
	},
	document_number: {
		type: DataTypes.STRING,
		unique: true,
	},
	gender: {
		type: DataTypes.STRING,

		defaultValue: 'FEMALE',
	},
	birthdate: {
		type: DataTypes.DATE,
	},
	nickname: {
		type: DataTypes.STRING,
	},
	avatar: {
		type: DataTypes.STRING,
	},
	verificationCode: {
		type: DataTypes.INTEGER,
	},
	isAccountVerified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
};

export const UserModel = sequelize.define('user', userSchema);
