import { DataTypes } from '@sequelize/core';
import { sequelize } from '../../database/MYSQL/sequelize';
import { adapters } from '../../utils/adapters';

export const CartModel = sequelize.define('cart', {
	id: {
		type: DataTypes.STRING,
		unique: true,
		defaultValue: adapters.generateID(10),
		primaryKey: true,
		allowNull: false,
	},
});
