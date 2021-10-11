import { deleteTicketsByStatus } from '../ticket/ticket.model';
import {
	getStatuses, findStatus, deleteStatus, createStatus, updateStatus,
} from './status.model';

export async function getStatusesHandler(req: any, res: any): Promise<void> {
	const statuses = await getStatuses();
	res.send(JSON.stringify(statuses));
}

export async function findStatusHandler(req: any, res: any): Promise<void> {
	const status = await findStatus(req.params.id);
	res.send(JSON.stringify(status));
}

export async function deleteStatusHandler(req: any, res: any): Promise<void> {
	await deleteStatus(req.params.id);
	await deleteTicketsByStatus(req.params.id);
	res.send(JSON.stringify({ success: true, id: req.params.id }));
}

export async function createStatusHandler(req: any, res: any): Promise<void> {
	const newStatus = await createStatus(req.body.status);
	res.send(JSON.stringify(newStatus));
}

export async function updateStatusHandler(req: any, res: any): Promise<void> {
	await updateStatus(req.body);
	const newStatus = await findStatus(req.body._id);
	res.send(JSON.stringify(newStatus));
}
