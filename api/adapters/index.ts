import { encrypt, encryptCompare } from './bcrypt';
import { generateToken, verifyToken } from './jwt';
import { generateID } from './nanoID';
import { generateCode } from './generateCode';
import { emailAdapter } from './nodemailer';
import { validateInput } from './joi';

export const adapters = {
	encrypt,
	encryptCompare,
	generateID,
	generateToken,
	verifyToken,
	generateCode,
	...emailAdapter,
	validateInput
};
