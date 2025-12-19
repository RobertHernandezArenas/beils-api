export class AuthEntity {
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

	static login(data: { [key: string]: any }): [string?, AuthEntity?] {
		const { email, password } = data;

		if (!email || !password) {
			throw new Error('Missing email or password');
		}

		return [undefined, new AuthEntity(email, password)];
	}
}
