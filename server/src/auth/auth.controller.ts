/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable object-curly-newline */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { config } from '../configs/config';
import { addToken, findTokenByID, updateToken, deleteToken } from '../token/token.model';
import { createUser, getUser } from '../users/users.model';

export async function registrationHandler(req: any, res: any): Promise<any> {
	try {
		const { password, name, email } = req.body.user;
		const candidate = await getUser({ $or: [{ name }, { email }] });
		if (candidate) {
			return res.status(400).json({ message: 'User name or email are already taken' });
		}
		const hashPassword = bcrypt.hashSync(password, config.bcryptCode);
		const newUser = { ...req.body.user, password: hashPassword };
		const createdUser = await createUser(newUser);
		return res.send(JSON.stringify(createdUser));
	} catch (err) {
		return res.status(400).json({ message: 'Registration error' });
	}
}
export async function loginHandler(req: any, res: any): Promise<void> {
	try {
		const { email, password } = req.body;
		const user = await getUser({ email });
		if (!user || !bcrypt.compareSync(password, user.password)) {
			return res.status(403).json({ message: 'User is not found or password is incorrect' });
		}
		const refreshToken = uuid();
		await addToken(refreshToken, user._id!);
		const token = jwt.sign({ id: user._id }, config.secretKey, { expiresIn: '60m' });
		const { _id, name, avaColor } = user;
		return res.status(200).json({ _id, name, email, avaColor, token, refreshToken });
	} catch (err) {
		return res.status(400).json({ message: 'Authorization error' });
	}
}

export async function refreshHandler(req: any, res: any): Promise<void> {
	try {
		let { refreshToken } = req.body;
		const dbToken = await findTokenByID(refreshToken);
		if (!dbToken) {
			return res.status(404).json({ message: 'User is not found' });
		}
		refreshToken = uuid();
		await updateToken(refreshToken, dbToken.userID);
		const token = jwt.sign({ id: dbToken.userID }, config.secretKey, { expiresIn: '60m' });
		const user = await getUser({ _id: dbToken.userID });
		const { _id, name, email, avaColor } = user;
		return res.status(200).json({ _id, name, email, avaColor, token, refreshToken });
	} catch (err) {
		return res.status(400).json({ message: 'Refresh token error' });
	}
}

export async function logoutHandler(req: any, res: any): Promise<void> {
	try {
		const user = req.body;
		await deleteToken(user._id);
		return res.status(200).json({ message: 'Logout successful' });
	} catch (err) {
		return res.status(400).json({ message: 'Logout error' });
	}
}
