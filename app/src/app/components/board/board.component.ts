import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent {
	constructor(
		private modalService: NgbModal,
	) { }

	openModal(): void {
		const modalRef = this.modalService.open(TicketCreateComponent);
		modalRef.componentInstance.selectedTicket;
	}
}
