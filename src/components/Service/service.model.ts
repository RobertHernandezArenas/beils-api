import { DataTypes } from '@sequelize/core';
import { sequelize } from '../../database/MYSQL/sequelize';
import { adapters } from '../../utils/adapters';

export const ServiceModel = sequelize.define('service', {
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
