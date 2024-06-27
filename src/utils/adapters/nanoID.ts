import { nanoid } from 'nanoid';

export const generateID = (lengthID: number): string => {
	return nanoid(lengthID);
};
