// eslint-disable-next-line object-curly-newline
import { saveTicket, findLatestTicket, updateTicket, findTicket } from './ticket.model';
import { ticketProcessing } from '../services/ticketProcessing';

export async function addTicketHandler(req: any, res: any): Promise<void> {
	const ticketData = req.body;
	const ticket = await ticketProcessing(ticketData);

	const newTicket = await saveTicket(ticket);
	res.send(JSON.stringify(newTicket));
}

export async function updateTicketHandler(req: any, res: any): Promise<void> {
	const data = req.body;

	await updateTicket(data.id, data);
	const updatedTicket = await findTicket(data.id);
	res.send(JSON.stringify(updatedTicket));
}

export async function findLatestTicketHandler(req: any, res: any): Promise<void> {
	const lastTicket: any = await findLatestTicket();
	const lastTicketNumber = lastTicket[0].ticketNumber.slice(5);

	const response = { lastTicketNumber };
	res.send(JSON.stringify(response));
}
