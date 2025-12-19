export interface IWhereClause {
	email?: string | object;
	name?: string | object;
	surname?: string | object;
	document_number?: string | object;
	phone?: string | object;
}

export interface UserDTO {
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
}
