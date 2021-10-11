import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { requestTickets, requestTicketsSuccess, requestTicketsFailure, updateTicket, updateTicketSuccess, updateTicketFailure, createTicket } from '../actions/tickets.actions';
import { catchError, switchMap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { TicketsService } from '../services/tickets.service';
import { TicketNumber } from '../models/ticket-create.model';
@Injectable()
export class TicketsEffects {
	public requestAllTickets$ = createEffect(() => this.actions$
		.pipe(
			ofType(requestTickets),
			switchMap(({ params }) =>
				this.ticketsService.getTicketsList(params)
					.pipe(
						map(tickets => requestTicketsSuccess({ tickets })),
						catchError((error: HttpErrorResponse) => of(requestTicketsFailure({ error })))
					)
			)
		)
	);

	public updateTicket = createEffect(() => this.actions$
		.pipe(
			ofType(updateTicket),
			switchMap(({ params, id }) =>
				this.ticketsService.updateTicket(params, id)
					.pipe(
						map(ticket => updateTicketSuccess({ ticket })),
						catchError((error: HttpErrorResponse) => of(updateTicketFailure({ error })))
					)
			)
		)
	);

	public createteTicket = createEffect(() => this.actions$
		.pipe(
			ofType(createTicket),
			switchMap(({ params }) => this.ticketsService.getLatestNumber()
				.pipe(
					switchMap((data: TicketNumber) => this.ticketsService.createTicket(params, data.lastTicketNumber)
						.pipe(
							map(ticket => updateTicketSuccess({ ticket })),
							catchError((error: HttpErrorResponse) => of(updateTicketFailure({ error }))),
						),
					),
					catchError((error: HttpErrorResponse) => of(updateTicketFailure({ error }))),
				),
			)
		)
	);

	constructor(private actions$: Actions, private ticketsService: TicketsService) { }
}
