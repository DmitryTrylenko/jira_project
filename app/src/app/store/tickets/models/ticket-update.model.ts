import { Assignee, Priority, Reporter, Status } from "./tickets-state.model";

export interface TicketUpdate {
	title?: string,
	body?: string,
	dateCreated?: Date
	lastUpdated?: Date,
	ticketNumber?: string,
	reporter?: Reporter,
	assignee?: Assignee,
	priorities?: Priority,
	status?: Status,
}