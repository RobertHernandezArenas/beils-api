import { DataTypes } from '@sequelize/core';
import { sequelize } from '../../database/MYSQL/sequelize';
import { adapters } from '../../adapters';

export const ProductModel = sequelize.define('product', {
	id: {
		type: DataTypes.STRING,
		unique: true,
		defaultValue: adapters.generateID(10),
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: true,
	},
});
