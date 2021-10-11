import { Component, OnInit } from '@angular/core';

import { Status, TicketModel, TicketsState } from 'src/app/store/tickets/models/tickets-state.model';
import { filter, takeUntil } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketEditComponent } from '../ticket-edit/ticket-edit.component';
import { TicketsStoreService } from 'src/app/store/tickets/services/tickets-store.service';
import { StatusesStoreService } from 'src/app/store/status/services/statuses-store.service';
import { Unsubscribable } from 'src/app/unsubscribe.class';
import { StatusModel } from 'src/app/store/status/models/statuses-state.models';
import { Store } from '@ngrx/store';
import { updateTicket } from 'src/app/store/tickets/actions/tickets.actions';

@Component({
	selector: 'app-columns',
	templateUrl: './columns.component.html',
	styleUrls: ['./columns.component.scss']
})

export class ColumnsComponent extends Unsubscribable implements OnInit {
	public statuses$: Observable<StatusModel[]>;
	public statuses: StatusModel[] = [];
	public tickets: { [key: string]: TicketModel[] } = {};

	constructor(
		private modalService: NgbModal,
		private ticketsStoreService: TicketsStoreService,
		private statusesStoreService: StatusesStoreService,
		private store: Store<TicketsState>,
	) {
		super();
		this.statusesStoreService.requestStatus();
	}

	ngOnInit(): void {
		combineLatest([
			this.ticketsStoreService.tickets,
			this.statusesStoreService.statuses$,
		]).pipe(
			takeUntil(this.unsubscribe),
			filter(([tickets, statuses]) => !!tickets && !!statuses),
		).subscribe(([tickets, statuses]) => {
			for (let i = 0; i < statuses.length; i++) {
				this.tickets[statuses[i].name] = tickets?.filter(el => el.status._id === statuses[i]._id) || [];
			}
		});

		this.statusesStoreService.statuses$.pipe(takeUntil(this.unsubscribe))
			.subscribe(statuses => this.statuses = statuses);
	}

	getTicketsByStatus(status: StatusModel) {
		return this.tickets[status?.name];
	}

	onItemDrop(data: any) {
		const ticket = data.dragData;
		const newStatusId = data.nativeEvent.currentTarget.getAttribute('data-id');
		const params = {
			status: this.statuses.find(status => status._id === newStatusId) as Status
		}
		this.store.dispatch(updateTicket({ params, id: ticket._id }));
	}

	openModal(ticket: TicketModel): void {
		const modalRef = this.modalService.open(TicketEditComponent);
		modalRef.componentInstance.selectedTicket = ticket;
	}

	identify(index: number, item: TicketModel | StatusModel) {
		return item._id;
	}
}
