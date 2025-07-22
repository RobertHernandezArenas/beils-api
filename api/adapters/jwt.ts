import JWT from 'jsonwebtoken';

export const generateToken = (
	object: { [key: string]: any },
	secret: string,
	expiresIn: string = '1d',
): string => {
	return JWT.sign(object, secret, { expiresIn: expiresIn });
};

export const verifyToken = (token: string, secret: string): any => {
	return JWT.verify(token, secret);
};
