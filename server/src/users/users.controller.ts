import { getUsersList } from './users.model';

export async function getUsersHandler(req: any, res: any) {
	try {
		const users = await getUsersList({});
		res.send(JSON.stringify(users));
	} catch (err) {
		res.status(400).json({ message: 'Get users error' });
	}
}
