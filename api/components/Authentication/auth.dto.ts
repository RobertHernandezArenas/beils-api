export class AuthDTO {
	private constructor(
		public id?: string,
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
		public is_lopd_accepted?: boolean,
		public is_rgpd_accepted?: boolean,
		public is_terms_and_conditions_accepted?: boolean,
	) {}

	static register(body: { [key: string]: any }): [string?, AuthDTO?] {
		const { email, password } = body;

		if (!email) return ['Email is required'];

		if (!password) return ['Password is required'];

		return [undefined, new AuthDTO(email, password)];
	}

	static login(body: { [key: string]: any }): [string?, AuthDTO?] {
		const { email, password } = body;

		if (!email) return ['Email is required'];

		if (!password) return ['Password is required'];

		return [undefined, new AuthDTO(email, password)];
	}
}
