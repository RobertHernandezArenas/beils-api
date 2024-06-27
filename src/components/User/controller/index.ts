import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../model';
import { Op, WhereOptions } from '@sequelize/core';
import { IWhereClause, UserDTO } from '../../../utils/interfaces/user';

export const UserController = {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const user = UserDTO.create(request.body);
			await UserModel.create({ ...user });
			response.status(201).json();
		} catch (error) {
			next(error);
		}
	},
	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const { id } = request.params;
			const userDatatoModify = request.body;

			await UserModel.update(userDatatoModify, { where: { id } });

			response.status(200).json({
				data: 'OK',
			});
		} catch (error) {
			next(error);
		}
	},
	async delete(request: Request, response: Response, next: NextFunction) {
		try {
			const { id } = request.params;

			await UserModel.destroy({ where: { id } });

			response.json({ message: 'OK' });
		} catch (error) {
			next(error);
		}
	},
	async findOne(request: Request, response: Response, next: NextFunction) {
		try {
			response.status(200).json({
				data: await UserModel.findOne({}),
			});
		} catch (error) {
			next(error);
		}
	},
	async findAll(request: Request, response: Response, next: NextFunction) {
		try {
			const { email, name, surname, phone, document_number } = request.query;

			const where: WhereOptions<IWhereClause> = {};

			if (email) where.email = email;
			if (name) where.name = { [Op.like]: `%${name}%` };
			if (surname) where.surname = { [Op.like]: `%${surname}%` };
			if (phone) where.phone = phone;
			if (document_number)
				where.document_number = { [Op.like]: `%${document_number}%` };

			const user = await UserModel.findAll({ where });
			response.status(200).json({
				data: user,
			});
		} catch (error) {
			next(error);
		}
	},
};
