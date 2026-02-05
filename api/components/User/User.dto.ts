import { z } from 'zod';
import {
	CreateUserSchema,
	LoginUserSchema,
	UpdateUserSchema,
} from './User.schema';

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type LoginUserDto = z.infer<typeof LoginUserSchema>;
