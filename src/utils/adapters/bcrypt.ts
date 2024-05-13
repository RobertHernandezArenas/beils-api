import bcrypt from 'bcrypt';

export const encrypt = (password: string, salt: number): Promise<string> => {
	return bcrypt.hash(password, salt);
};
