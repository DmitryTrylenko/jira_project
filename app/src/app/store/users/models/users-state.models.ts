export const UsersStateName = 'users';

export interface UsersState {
	users: UserModel[] | undefined;
}

export interface UserModel {
	_id: string,
	name: string,
	email: string,
	token?: string,
	refreshToken?: string,
	password?: string,
	avaColor?: string,
}