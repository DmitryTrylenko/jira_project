export const TicketsStateName = 'tickets';

export interface TicketsState {
	tickets: TicketModel[] | undefined;
}

export interface Reporter {
	_id: string,
	name?: string,
}

export interface Assignee {
	_id: string,
	name?: string,
	avaColor?: string,
}

export interface Priority {
	_id: string,
	priority?: string,
}

export interface Status {
	_id: string;
	name?: string;
	sortOrder?: number;
}

export interface TicketModel {
	dateCreated: Date | string;
	lastUpdated: Date | string;
	reporter: Reporter;
	assignee: Assignee;
	title: string;
	ticketNumber: string;
	body?: string;
	priority: Priority;
	status: Status;
	_id?: string;
}

export interface Paginator<T> {
	items: T[];
	length: number;
}
