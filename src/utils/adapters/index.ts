import { encrypt } from './bcrypt';
import { generateID } from './nanoID';

export const adapters = { encrypt, generateID };
