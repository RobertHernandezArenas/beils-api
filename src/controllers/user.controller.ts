import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.model';
import { userResponses } from '../utils/messages/responses/user.responses';
import { encrypt } from '../utils/adapters/bcrypt';
import { Op, WhereOptions } from '@sequelize/core';
import { IWhereClause } from '../utils/interfaces/users';

export const UserController = {
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			await UserModel.create({
				name: request.body.name,
				surname: request.body.surname,
				phone: request.body.phone,
				email: request.body.email,
				password: await encrypt(
					request.body.password ?? process.env.PASSWORD,
					10,
				),
			});
			response.status(200).json(userResponses.create);
		} catch (error: unknown) {
			response.status(409).json({
				error: true,
				message: 'REGISTER_CONFLICT',
				data: {},
			});
			next(error);
		}
	},
	async update(request: Request, response: Response, next: NextFunction) {
		try {
			const { id } = request.params;
			const userData = request.body;
			await UserModel.update({ userData }, { where: { id } });

			response.json({ message: 'OK' });
		} catch (error) {
			console.error('Error al actualizar el usuario:', error);
			response.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
			next(error);
		}
	},
	async delete(request: Request, response: Response, next: NextFunction) {
		try {
			const { id } = request.params;

			await UserModel.destroy({ where: { id } });

			response.json({ message: 'OK' });
		} catch (error) {
			console.error('Error al actualizar el usuario:', error);
			response.status(500).json({ message: 'INTERNAL_SERVER_ERROR' });
			next(error);
		}
	},
	async findOne(request: Request, response: Response, next: NextFunction) {
		try {
			response.status(200).json({
				data: await UserModel.findOne({}),
			});
		} catch (error) {
			response.status(400).json(error);
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

			console.log(email);
			const user = await UserModel.findAll({ where });
			response.status(200).json({
				data: user,
			});
		} catch (error) {
			response.status(400).json(error);
			next(error);
		}
	},
};
