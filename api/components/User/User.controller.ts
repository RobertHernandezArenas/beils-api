import { adapters } from '@/adapters';
import { CONFIG_GLOBALS } from '@/config';
import { IWhereClause } from '@utils/interfaces/user';
import { Op, WhereOptions } from '@sequelize/core';
import { Request, Response, NextFunction } from 'express';
import { UserDTO } from '@User/User.dto';
import { UserModel } from './User.model';

export const UserController = {
	// TODO: Pending to create email component for sending verificationCode
	async create(request: Request, response: Response, next: NextFunction) {
		try {
			console.log('PASSWORD:::>', request.body?.password);
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
			const userDatatoModify = await UserDTO.create(request.body);

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

			const passwordMatch = await adapters.encryptCompare(
				password,
				user.dataValues.password,
			);

			if (!passwordMatch) {
				return response.status(401).json({
					code: 401,
					status: 'error',
					type: 'UNAUTHORIZED',
				});
			}

			const token = adapters.generateToken(
				{ user },
				CONFIG_GLOBALS.JWT.SECRET,
				CONFIG_GLOBALS.JWT.DURATION,
			);

			response.status(200).header('Authorization', `Bearer ${token}`).json({
				data: false,
			});
		} catch (error) {
			next(error);
		}
	},
	// TODO: Pending to create email component
	forgotPassword: async (
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		try {
			response.status(200).json({
				data: 'OK',
			});
		} catch (error) {
			next(error);
		}
	},
	activateAccount: async (
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		try {
			response.status(200).json({
				data: 'OK',
			});
		} catch (error) {
			next(error);
		}
	},
	deactivateAccount: async (
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		try {
			const { email } = request.body;
			const user = await UserModel.findOne({ where: { email } });
			if (!user) {
				return response.status(404).json({
					code: 404,
					status: 'error',
					type: 'NOT_FOUND',
				});
			}
			response.status(200).json({
				data: 'OK',
			});
		} catch (error) {
			next(error);
		}
	},
};
