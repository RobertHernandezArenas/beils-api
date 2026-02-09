import { Infer } from '@/adapters/zod'; // Import Infer type from our adapter
import { UserSchema } from './User.schema';

export type CreateUserDto = Infer<typeof UserSchema.create>;
export type UpdateUserDto = Infer<typeof UserSchema.update>;
export type LoginUserDto = Infer<typeof UserSchema.login>;

export type UserDTO = {
	create: CreateUserDto;
	update: UpdateUserDto;
	login: LoginUserDto;
};
