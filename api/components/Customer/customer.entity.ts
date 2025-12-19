import { CustomerCreateDTO, CustomerDTO } from './customer.interface';
import { customerModel } from './customer.model';

export class CustomerEntity {
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
	) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.phone = phone;
		this.mobile = mobile;
		this.email = email;
		this.password = password;
		this.country = country;
		this.city = city;
		this.zipcode = zipcode;
		this.address = address;
		this.role = role;
		this.type_document = type_document;
		this.document_number = document_number;
		this.genre = genre;
		this.birthdate = birthdate;
		this.username = username;
		this.avatar = avatar;
		this.verificationCode = verificationCode;
		this.isAccountVerified = isAccountVerified;
		this.is_lopd_accepted = is_lopd_accepted;
		this.is_rgpd_accepted = is_rgpd_accepted;
		this.is_terms_and_conditions_accepted =
			is_terms_and_conditions_accepted;
	}

	public static async create(): Promise<any> {
		return customerModel.create();
	}
}
