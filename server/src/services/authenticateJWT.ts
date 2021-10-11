import jwt from 'jsonwebtoken';
import { config } from '../configs/config';

export function authJWT(req: any, res: any, next: any): void {
	let response: any;
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];// to get token from string 'Bearer {token}'

		jwt.verify(token, config.secretKey, (err: any, user: any) => {
			if (err) {
				res.status(401).json({ message: 'Token is expired' });
			} else {
				req.user = user;
				next();
			}
		});
	} else {
		response = { code: 403 }; // lack of authentication credetials
		res.send(JSON.stringify(response));
	}
}
