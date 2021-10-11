import { Schema, model } from 'mongoose';

export interface User {
	_id?: string,
	name: string,
	email: string,
	token?: string,
	refreshToken?: string,
	password: string,
	avaColor?: string,
}

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		uniqe: true,
	},
	password: {
		type: String,
		required: true,
	},
	avaColor: {
		type: String,
		required: true,
	},
});

export const UserModel = model('user', UserSchema);

export function getUsersList(filter: any): Promise<User[]> {
	return UserModel.find(filter, { __v: 0, password: 0 }).sort({ sortOrder: 1 });
}

export function createUser(user: User): Promise<User> {
	return new UserModel(user).save();
}

export function getUser(filter: any): Promise<User> {
	return UserModel.findOne(filter, { __v: 0 }).sort({ sortOrder: 1 });
}
