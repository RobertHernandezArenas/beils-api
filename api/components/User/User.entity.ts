import { Utils } from '../../utils';
import { UserDTO } from './User.interface';
import { adapters } from '@/adapters';

export class UserEntity {
	private constructor(
		public name?: string,
		public surname?: string,
		public phone?: string,
		public mobile?: string,
		public email?: string,
		public password?: string,
		public country?: string,
		public city?: string,
		public zipcode?: string,
		public address?: string,
		public role?: string,
		public type_document?: string,
		public document_number?: string,
		public genre?: string,
		public birthdate?: string,
		public username?: string,
		public avatar?: string,
		public verificationCode?: number,
		public isAccountVerified?: boolean,
	) {}

	public static async create(body: UserDTO): Promise<UserEntity> {
		const {
			email,
			name,
			surname,
			phone,
			password,
			country,
			city,
			zipcode,
			address,
			role,
			type_document,
			document_number,
			genre,
			birthdate,
			username,
			avatar,
			verificationCode = adapters.generateCode(1000001, 9999999),
			isAccountVerified,
		} = body;
		return new UserEntity(
			email?.toLowerCase(),
			Utils.tools.capitalizeEachFirstLetter(name ?? ''),
			Utils.tools.capitalizeEachFirstLetter(surname ?? ''),
			phone,
			await Utils.adapters.encrypt(password ?? '123456', 10),
			country?.toUpperCase() ?? 'SPAIN',
			city?.toUpperCase() ?? 'A CORUÑA',
			zipcode,
			address,
			role?.toUpperCase(),
			type_document?.toUpperCase() ?? 'DNI',
			document_number,
			genre?.toUpperCase() ?? 'FEMALE',
			birthdate,
			username,
			avatar,
			verificationCode,
			isAccountVerified,
		);
	}
}
