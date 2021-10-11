import { Request, Response } from 'express';
import { getCountTickets, getTicketsPagination, getTicketsList } from './tickets-list.model';

async function getTicketsPaginationHandler(req: any, res: any): Promise<void> {
	const limit = Number(req.query.limit);
	const page = Number(req.query.page) === 1 ? 0 : (Number(req.query.page) - 1) * limit;
	const filter = { ...req.query };
	delete filter.page;
	delete filter.limit;
	const ticketsPagination = await getTicketsPagination(page, limit, filter);
	const countTickets = await getCountTickets(filter);

	res.send(JSON.stringify([ticketsPagination, countTickets]));
}

async function getTicketsListHandler(req: any, res: any): Promise<void> {
	const ticketsList = await getTicketsList(req.query);
	res.send(JSON.stringify(ticketsList));
}

export function getTicketsHandler(req: Request, res: Response): Promise<void> {
	if (req.query.page) {
		return getTicketsPaginationHandler(req, res);
	}
	return getTicketsListHandler(req, res);
}
