import { Injectable } from '@angular/core';

import { TicketModel, Paginator } from '../../tickets/models/tickets-state.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TicketFilter } from '../models/ticket-filter.model';
import { TicketUpdate } from '../models/ticket-update.model';
import { TicketCreate, TicketNumber } from '../models/ticket-create.model';
import { BACKLOG_STATUS_ID } from 'src/app/configs/config';
@Injectable({
	providedIn: 'root'
})
export class TicketsService {
	getTicketNumber: Generator<string> | undefined;
	latestNumber = 0;

	constructor(private httpClient: HttpClient) { }

	public getTicketsList(params?: TicketFilter): Observable<TicketModel[]> {
		return this.httpClient.get<TicketModel[]>(`tickets-list`, { params: params as unknown as HttpParams });
	}

	requestPaginatedTickets(page = 0, limit = 5): Observable<Paginator<TicketModel>> {
		const params = { page, limit };
		return this.httpClient.get<Paginator<TicketModel>>('tickets', { params });
	}

	public getLatestNumber(): Observable<TicketNumber> {
		return this.httpClient.get<TicketNumber>('ticket/latestNumber');
	}

	public updateTicket(body: TicketUpdate, id: string): Observable<TicketModel> {
		return this.httpClient.put<TicketModel>('ticket/update', { ...body, id });
	}

	public createTicket(data: Partial<TicketCreate>, ticketNumber: string): Observable<TicketModel> {
		const ticket = {
			...data,
			reporter: { _id: localStorage.getItem('userId') },
			dateCreated: this.dateTransformForDB(new Date()),
			lastUpdated: new Date(),
			status: { _id: BACKLOG_STATUS_ID },
			ticketNumber: `JMP4-${Number(ticketNumber) + 1}`,
		};
		return this.httpClient.post<TicketModel>('ticket/new', { ...ticket });
	}

	public dateTransformForDB(date: Date): string {
		return `${date.getFullYear()}-${this.getTwoDigits(date.getMonth() + 1)}-${this.getTwoDigits(date.getDate())}`;
	}

	public getTwoDigits(num: number): any {
		if (num < 10) {
			return `0${num}`;
		}
		return num;
	}
}
