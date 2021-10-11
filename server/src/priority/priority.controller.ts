import { getPriorities } from './priority.model';

export async function getPrioritiesHandler(req: any, res: any): Promise<void> {
	const priorities = await getPriorities();
	res.send(JSON.stringify(priorities));
}
