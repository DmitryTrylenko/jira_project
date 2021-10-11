import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TicketModel, TicketsState } from '../models/tickets-state.model';
import { TicketFilter } from '../models/ticket-filter.model';
import { requestTickets } from '../actions/tickets.actions';
import { selectAllTickets } from '../selectors/tickets.selectors';


@Injectable({
	providedIn: 'root'
})

export class TicketsStoreService {
	public get tickets(): Observable<TicketModel[]> {
		return this.store.pipe(select(selectAllTickets)) as Observable<TicketModel[]>;
	}

	constructor(private store: Store<TicketsState>) { }

	public requestTickets(params: TicketFilter): void {
		this.store.dispatch(requestTickets({ params }));
	}
}
