import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { TicketModel } from '../models/tickets-state.model';
import { Params } from '../../../models/common-models';
import { TicketFilter } from '../models/ticket-filter.model';
import { TicketUpdate } from '../models/ticket-update.model';
import { TicketCreate } from '../models/ticket-create.model';

export const ticketsActionTypes = {
	requestTickets: '[Tickets] Request tickets',
	requestTicketsSuccess: '[Tickets] Request tickets success',
	requestTicketsFailure: '[Tickets] Request tickets failure',
	updateTicket: '[Ticket] Update ticket',
	updateTicketSuccess: '[Ticket] Update ticket success',
	updateTicketFailure: '[Ticket] Update ticket failure',
	createTicket: '[Ticket] Create ticket',
	createTicketSuccess: '[Ticket] Create ticket success',
	createTicketFailure: '[Ticket] Create ticket failure',
};

export const requestTickets = createAction(
	ticketsActionTypes.requestTickets,
	props<{ params?: TicketFilter }>(),
);

export const requestTicketsSuccess = createAction(
	ticketsActionTypes.requestTicketsSuccess,
	props<{ tickets: TicketModel[] }>()
);

export const requestTicketsFailure = createAction(
	ticketsActionTypes.requestTicketsFailure,
	props<{ error: HttpErrorResponse }>()
);

export const updateTicket = createAction(
	ticketsActionTypes.updateTicket,
	props<{ params: TicketUpdate, id: string }>(),
);

export const updateTicketSuccess = createAction(
	ticketsActionTypes.updateTicketSuccess,
	props<{ ticket: TicketModel }>()
);

export const updateTicketFailure = createAction(
	ticketsActionTypes.updateTicketFailure,
	props<{ error: HttpErrorResponse }>()
);

export const createTicket = createAction(
	ticketsActionTypes.createTicket,
	props<{ params: Partial<TicketCreate> }>(),
);

export const createTicketSuccess = createAction(
	ticketsActionTypes.createTicketSuccess,
	props<{ ticket: TicketModel }>()
);

export const createTicketFailure = createAction(
	ticketsActionTypes.createTicketFailure,
	props<{ error: HttpErrorResponse }>()
);
