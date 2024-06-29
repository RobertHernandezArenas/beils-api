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
	verificationCode?: number;
	isAccountVerified?: boolean;
}
