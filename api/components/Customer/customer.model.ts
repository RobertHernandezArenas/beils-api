import { DataTypes } from '@sequelize/core';
import { sequelize } from '../../database/MYSQL/sequelize';
import { adapters } from '../../adapters';
import { CONFIG_GLOBALS } from '@/config';

const { CUSTOMER } = CONFIG_GLOBALS.DATABASE.TABLES;

const customerSequelizeSchema = {
	id: {
		type: DataTypes.STRING,
		unique: true,
		defaultValue: adapters.generateID(6),
		primaryKey: true,
		allowNull: false,
	},
	name: { type: DataTypes.STRING },
	surname: { type: DataTypes.STRING },
	phone: { type: DataTypes.STRING },
	mobile: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, unique: true, allowNull: false },
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
	zipcode: { type: DataTypes.STRING },
	address: { type: DataTypes.STRING },
	role: { type: DataTypes.STRING, allowNull: false, defaultValue: CUSTOMER },
	type_document: {
		type: DataTypes.STRING,
		defaultValue: 'DNI',
	},
	document_number: { type: DataTypes.STRING, unique: true },
	genre: {
		type: DataTypes.STRING,
		defaultValue: 'FEMALE',
	},
	birthdate: { type: DataTypes.DATE },
	username: { type: DataTypes.STRING },
	avatar: { type: DataTypes.STRING },
	verificationCode: { type: DataTypes.INTEGER },
	isAccountVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
	is_lopd_accepted: { type: DataTypes.BOOLEAN, defaultValue: false },
	is_rgpd_accepted: { type: DataTypes.BOOLEAN, defaultValue: false },
	is_terms_and_conditions_accepted: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
};

export const customerModel = sequelize.define(
	CUSTOMER,
	customerSequelizeSchema,
);
