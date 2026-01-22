import { nanoid } from 'nanoid'; 	
import { v4 as uuidv4 } from 'uuid';

export const generateID = (lengthID: number): string => {
	return nanoid(lengthID);
};

export const generateUUID = (): string => {
	return uuidv4();
};
