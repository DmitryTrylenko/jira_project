import { Assignee, Reporter, Status, Priority } from "./tickets-state.model";

export interface TicketCreate {
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

export interface TicketNumber {
	[lastTicketNumber: string]: string;
}