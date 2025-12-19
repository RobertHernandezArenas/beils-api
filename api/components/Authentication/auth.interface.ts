export interface IWhereClause {
	email?: string | object;
	name?: string | object;
	surname?: string | object;
	document_number?: string | object;
	phone?: string | object;
}

export interface AuthDTO {
	id: string;
	name: string;
	surname: string;
	phone: string;
	mobile: string;
	email: string;
	password: string;
	country: string;
	city: string;
	zipcode: string;
	address: string;
	role: string;
	type_document?: string;
	document_number?: string;
	genre: string;
	birthdate: string;
	username: string;
	avatar: string;
	verificationCode?: number;
	isAccountVerified?: boolean;
	is_lopd_accepted: boolean;
	is_rgpd_accepted: boolean;
	is_terms_and_conditions_accepted: boolean;
}

export interface AuthCreateDTO {
	id: string;
	name: string;
	surname: string;
	mobile: string;
	email: string;
	country: 'SPAIN';
	city: 'A CORUÑA';
	zipcode: string;
	address: string;
	role: 'USER';
	type_document?: string;
	document_number?: string;
	genre: 'MALE' | 'FEMALE';
	birthdate: string;
	is_lopd_accepted: boolean;
	is_rgpd_accepted: boolean;
	is_terms_and_conditions_accepted: boolean;
}
