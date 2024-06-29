import { Utils } from '../../../utils/';
import { IUser } from '../../../utils/interfaces/user';

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
		public verificationCode?: number,
		public isAccountVerified?: boolean,
	) {}

	public static async create(body: IUser): Promise<UserDTO> {
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
			verificationCode = Utils.adapters.generateCode(1000001, 9999999),
			isAccountVerified,
		} = body;
		return new UserDTO(
			email?.toLowerCase(),
			Utils.tools.capitalizeEachFirstLetter(name ?? ''),
			Utils.tools.capitalizeEachFirstLetter(surname ?? ''),
			phone,
			await Utils.adapters.encrypt(password ?? '123456', 10),
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
			verificationCode,
			isAccountVerified,
		);
	}
}
