import { PrioritiesModel } from '../priority/priority.model';
import { StatusModel } from '../status/status.model';
import { TicketFE, TicketModel } from '../ticket/ticket.model';
import { UserModel } from '../users/users.model';

export function getTicketsList(filter: any): Promise<TicketFE[]> {
	return TicketModel
		.find(filter, { __v: 0 })
		.populate({ path: 'assignee', select: 'name avaColor', model: UserModel })
		.populate({ path: 'reporter', select: 'name', model: UserModel })
		.populate({ path: 'priority', select: 'priority', model: PrioritiesModel })
		.populate({ path: 'status', select: 'name', model: StatusModel });
}

export function getTicketsPagination(page: number, limit: number, filter: Record<string, unknown>): Promise<TicketFE[]> {
	return TicketModel
		.find(filter, { __v: 0 })
		.limit(limit)
		.skip(page)
		.populate({ path: 'assignee', select: 'name avaColor', model: UserModel })
		.populate({ path: 'reporter', select: 'name', model: UserModel })
		.populate({ path: 'priority', select: 'priority', model: PrioritiesModel })
		.populate({ path: 'status', select: 'name', model: StatusModel });
}

export function getCountTickets(filter: any): Promise<number> {
	return TicketModel.countDocuments(filter);
}
