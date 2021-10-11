import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { PrioritiesStoreService } from 'src/app/store/priorities/services/priorities-store.service';
import { createTicket } from 'src/app/store/tickets/actions/tickets.actions';
import { TicketCreate } from 'src/app/store/tickets/models/ticket-create.model';
import { UserModel } from 'src/app/store/users/models/users-state.models';
import { UsersStoreService } from 'src/app/store/users/services/users-store.service';
import { Unsubscribable } from 'src/app/unsubscribe.class';
import { Priority, TicketsState } from 'src/app/store/tickets/models/tickets-state.model';

@Component({
	selector: 'app-ticket-create',
	templateUrl: './ticket-create.component.html',
	styleUrls: ['./ticket-create.component.scss']
})
export class TicketCreateComponent extends Unsubscribable implements OnInit {
	priorities: Priority[] = [];
	users: UserModel[] = [];
	selectedTitle = 'Please type title';
	selectedDescription: string;
	selectedAssignee: string;
	selectedPriority: string;

	constructor(
		private usersStoreService: UsersStoreService,
		private prioritiesStoreService: PrioritiesStoreService,
		public activeModal: NgbActiveModal,
		private store: Store<TicketsState>,
	) {
		super();
		this.usersStoreService.requestUserMe();
		this.prioritiesStoreService.requestPriority();
	}

	ngOnInit(): void {
		this.usersStoreService.users.pipe(
			takeUntil(this.unsubscribe),
			filter(users => !!users)
		).subscribe(users => {
			this.users = users;
			this.selectedAssignee = users[0]._id;
		});
		this.prioritiesStoreService.priorities.pipe(
			takeUntil(this.unsubscribe),
			filter(priorities => !!priorities)
		).subscribe(priorities => {
			this.priorities = priorities;
			this.selectedPriority = priorities[0]._id
		});
	}

	onSubmit(): void {
		const params: Partial<TicketCreate> = {
			title: this.selectedTitle,
			body: this.selectedDescription,
			assignee: this.users.find(el => el._id === this.selectedAssignee) as UserModel,
			priority: this.priorities.find(el => el._id === this.selectedPriority) as Priority,
		}
		this.store.dispatch(createTicket({ params }));
		this.close();
	}

	close(): void {
		this.activeModal.close();
	}

}
