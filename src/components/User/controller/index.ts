import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../model';
import { Op, WhereOptions } from '@sequelize/core';
import { IWhereClause, UserDTO } from '../../../utils/interfaces/user';
import { generateToken } from '../../../utils/adapters/jwt';

export const UserController = {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			const user = await UserDTO.create(request.body);
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

	login: async (request: Request, response: Response, next: NextFunction) => {
		try {
			const { email, password } = request.body;

			const user = await UserModel.findOne({ where: { email } });

			if (!user) {
				return response.status(404).json({
					code: 404,
					status: 'error',
					type: 'NOT_FOUND',
				});
			}

			if (user.dataValues.password !== password) {
				return response.status(401).json({
					code: 401,
					status: 'error',
					type: 'UNAUTHORIZED',
				});
			}

			const token = generateToken({ user }, 'tiringuistinguis', '30s');
			console.log(token);
			response.status(200).header('Authorization', `Bearer ${token}`).json({
				data: false,
			});
		} catch (error) {
			next(error);
		}
	},
};
