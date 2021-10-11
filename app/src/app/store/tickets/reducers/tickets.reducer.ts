import { ActionReducerMap } from '@ngrx/store';
import { TicketsState } from '../models/tickets-state.model';
import { TicketModel } from '../models/tickets-state.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
	createTicketSuccess,
	requestTickets,
	requestTicketsSuccess,
	updateTicketSuccess,
} from '../actions/tickets.actions';

export const ticketsReducers: ActionReducerMap<TicketsState> = {
	tickets: ticketsListReducer,
};

const reducer = createReducer<TicketModel[] | undefined>(
	undefined,
	on(requestTickets, () => undefined),
	on(requestTicketsSuccess, (state, { tickets }) => tickets),
	on(updateTicketSuccess, (state, { ticket }) => {
		return state ? [...state.filter(el => el._id !== ticket._id), ticket] : undefined;
	}),
	on(createTicketSuccess, (state, { ticket }) => {
		return state ? [...state.filter(el => el._id !== ticket._id), ticket] : undefined;
	}),
);

function ticketsListReducer(state: TicketModel[] | undefined, action: Action) {
	return reducer(state, action);
}
