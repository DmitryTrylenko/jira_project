import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { TicketsState, TicketModel, TicketsStateName } from '../models/tickets-state.model';

export const selectTicketsState = createFeatureSelector<TicketsState>(TicketsStateName);

export const selectAllTickets: MemoizedSelector<TicketsState, TicketModel[] | undefined> = createSelector(
	selectTicketsState,
	(ticketsState: TicketsState): TicketModel[] | undefined => ticketsState.tickets
);