import { Infer } from '@/adapters/zod'; // Import Infer type from our adapter
import { UserSchema } from './User.schema';

export type CreateUserDto = Infer<typeof UserSchema.create>;
export type UpdateUserDto = Infer<typeof UserSchema.update>;
export type UpdateUserStatusDto = Infer<typeof UserSchema.updateStatus>;
export type RefreshTokenDto = Infer<typeof UserSchema.refreshToken>;
export type LoginUserDto = Infer<typeof UserSchema.login>;

export type PublicUserDto = {
	user_id: string;
	email: string;
	role?: string;
	created_at: Date;
	updated_at: Date;
};

export type UserDTO = {
	create: CreateUserDto;
	update: UpdateUserDto;
	login: LoginUserDto;
	public: PublicUserDto;
	updateStatus: UpdateUserStatusDto;
	refreshToken: RefreshTokenDto;
};
