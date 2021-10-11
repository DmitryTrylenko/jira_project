import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';

import { TicketsStoreService } from 'src/app/store/tickets/services/tickets-store.service';
import { Unsubscribable } from 'src/app/unsubscribe.class';
import { TicketModel } from '../../../store/tickets/models/tickets-state.model';
import { TicketEditComponent } from '../ticket-edit/ticket-edit.component';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent extends Unsubscribable implements OnInit {
	public tickets: TicketModel[] = [];

	constructor(
		private ticketsStoreService: TicketsStoreService,
		private modalService: NgbModal,
	) {
		super();
	}

	ngOnInit(): void {
		this.ticketsStoreService.tickets.pipe(
			takeUntil(this.unsubscribe)
		).subscribe(tickets => { this.tickets = tickets });
	}

	openModal(ticket: TicketModel): void {
		const modalRef = this.modalService.open(TicketEditComponent);
		modalRef.componentInstance.selectedTicket = ticket;
	}

	identify(index: number, item: TicketModel) {
		return item._id;
	}
}
