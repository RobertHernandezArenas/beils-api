import bcrypt from 'bcrypt';

export const encrypt = (password: string, salt: number): Promise<string> => {
	return bcrypt.hash(password, salt);
};

export const encryptCompare = (
	passwordTo: string,
	passwordFrom: string,
): Promise<boolean> => {
	return bcrypt.compare(passwordTo, passwordFrom);
};
