import { Component, OnInit, Input } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { PriorityModel } from 'src/app/store/priorities/models/priorities-state.models';
import { PrioritiesStoreService } from 'src/app/store/priorities/services/priorities-store.service';
import { StatusModel } from 'src/app/store/status/models/statuses-state.models';
import { StatusesStoreService } from 'src/app/store/status/services/statuses-store.service';
import { Priority, Status, TicketModel, TicketsState } from 'src/app/store/tickets/models/tickets-state.model';
import { TicketsService } from 'src/app/store/tickets/services/tickets.service';
import { UserModel } from 'src/app/store/users/models/users-state.models';
import { UsersStoreService } from 'src/app/store/users/services/users-store.service';
import { Unsubscribable } from 'src/app/unsubscribe.class';
import { updateTicket } from 'src/app/store/tickets/actions/tickets.actions';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'ticket-edit',
	templateUrl: './ticket-edit.component.html',
	styleUrls: ['./ticket-edit.component.scss']
})
export class TicketEditComponent extends Unsubscribable implements OnInit {
	@Input() set selectedTicket(ticket: TicketModel) {
		this.selectedDescription = ticket.body || '';
		this.selectedAssignee = ticket.assignee._id;
		this.selectedPriority = ticket.priority._id;
		this.selectedStatus = ticket.status._id;
		this.ticket = ticket;
	}
	priorities: PriorityModel[] = [];
	users: UserModel[] = [];
	statuses: StatusModel[] = [];
	selectedDescription: string;
	selectedAssignee: string;
	selectedPriority: string;
	selectedStatus: string;
	ticket: TicketModel;

	constructor(
		private usersStoreService: UsersStoreService,
		private prioritiesStoreService: PrioritiesStoreService,
		private statusesStoreService: StatusesStoreService,
		private ticketService: TicketsService,
		private store: Store<TicketsState>,
		public activeModal: NgbActiveModal,
	) {
		super();
		this.usersStoreService.requestUserMe();
		this.prioritiesStoreService.requestPriority();
		this.statusesStoreService.requestStatus();
	}

	ngOnInit(): void {
		this.usersStoreService.users.pipe(
			takeUntil(this.unsubscribe)
		).subscribe(users => {
			this.users = users;
		});
		this.prioritiesStoreService.priorities.pipe(
			takeUntil(this.unsubscribe)
		).subscribe(priorities => { this.priorities = priorities });
		this.statusesStoreService.statuses$.pipe(
			takeUntil(this.unsubscribe)
		).subscribe(statuses => { this.statuses = statuses });
	}

	onSubmit(): void {
		const params = {
			body: this.selectedDescription,
			assignee: this.users.find(user => user._id === this.selectedAssignee) as UserModel,
			priorities: this.priorities.find(priority => priority._id === this.selectedPriority) as Priority,
			status: this.statuses.find(status => status._id === this.selectedStatus) as Status
		}
		this.store.dispatch(updateTicket({ params, id: <string>this.ticket._id }));
		this.close();
	}

	close() {
		this.activeModal.close();
	}
}
