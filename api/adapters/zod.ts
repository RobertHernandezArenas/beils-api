import { z as zod } from 'zod';

export const validateInput = () => {
	return zod;
};

export type Infer<T extends zod.ZodType<any, any, any>> = zod.infer<T>;
