import { Utils } from '../..';

export interface IWhereClause {
	email?: string | object;
	name?: string | object;
	surname?: string | object;
	document_number?: string | object;
	phone?: string | object;
}

export interface IUser {
	id?: string;
	name?: string;
	surname?: string;
	phone?: string;
	email: string;
	password?: string;
	country?: string;
	city?: string;
	zip_code?: string;
	address?: string;
	role?: string;
	type_document?: string;
	document_number?: string;
	gender?: string;
	birthdate?: string;
	nickname?: string;
	avatar?: string;
}

export class UserDTO {
	private constructor(
		public email: string,
		public name?: string,
		public surname?: string,
		public phone?: string,
		public password?: string,
		public country?: string,
		public city?: string,
		public zip_code?: string,
		public address?: string,
		public role?: string,
		public type_document?: string,
		public document_number?: string,
		public gender?: string,
		public birthdate?: string,
		public nickname?: string,
		public avatar?: string,
	) {}

	public static create(body: IUser): UserDTO {
		const {
			email,
			name,
			surname,
			phone,
			password,
			country,
			city,
			zip_code,
			address,
			role,
			type_document,
			document_number,
			gender,
			birthdate,
			nickname,
			avatar,
		} = body;
		return new UserDTO(
			email?.toLowerCase(),
			Utils.tools.capitalizeEachFirstLetter(name ?? ''),
			Utils.tools.capitalizeEachFirstLetter(surname ?? ''),
			phone,
			password ?? '123456',
			country?.toUpperCase() ?? 'SPAIN',
			city?.toUpperCase() ?? 'A CORUÑA',
			zip_code,
			address,
			role?.toUpperCase(),
			type_document?.toUpperCase() ?? 'DNI',
			document_number,
			gender?.toUpperCase() ?? 'FEMALE',
			birthdate,
			nickname,
			avatar,
		);
	}
}
