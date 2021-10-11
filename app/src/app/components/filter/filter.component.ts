import { Component, OnInit } from '@angular/core';

import { PriorityModel } from '../../store/priorities/models/priorities-state.models';
import { UserModel } from '../../store/users/models/users-state.models';
import { UsersStoreService } from 'src/app/store/users/services/users-store.service';
import { PrioritiesStoreService } from 'src/app/store/priorities/services/priorities-store.service';
import { Unsubscribable } from 'src/app/unsubscribe.class';
import { filter, takeUntil } from 'rxjs/operators';
import { TicketsStoreService } from 'src/app/store/tickets/services/tickets-store.service';
import { combineLatest } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-filter',
	templateUrl: './filter.component.html',
	styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends Unsubscribable implements OnInit {
	priorities: PriorityModel[] = [];
	users: UserModel[] = [];
	selectedUserId: string;
	selectedPriorityId: string;
	selectedDate: string;
	form!: FormGroup;

	constructor(
		private usersStoreService: UsersStoreService,
		private prioritiesStoreService: PrioritiesStoreService,
		private ticketsStoreService: TicketsStoreService,
	) {
		super();
		this.prioritiesStoreService.requestPriority();
		this.usersStoreService.requestUserMe();
	}

	onUserChange(event: any) {
		this.selectedUserId = event.target.value;
		this.getTickets();
	}

	onPriorityChange(event: any) {
		this.selectedPriorityId = event.target.value;
		this.getTickets();
	}

	onDateChange(event: any) {
		this.selectedDate = event.target.value;
		this.getTickets();
	}

	ngOnInit(): void {

		combineLatest([
			this.prioritiesStoreService.priorities,
			this.usersStoreService.users
		]).pipe(
			takeUntil(this.unsubscribe),
			filter(([priorities, users]) => !!priorities && !!users),
		)
			.subscribe(([priorities, users]) => {
				this.priorities = priorities;
				this.users = users;
				this.getTickets();
			});
	}

	private getTickets() {
		const assignee = this.selectedUserId;
		const priority = this.selectedPriorityId;
		const dateCreated = this.selectedDate;
		console.log(dateCreated);
		if (dateCreated) {
			this.ticketsStoreService.requestTickets({
				...(assignee ? { assignee } : {}),
				...(priority ? { priority } : {}),
				dateCreated: dateCreated
			});
		} else {
			this.ticketsStoreService.requestTickets({
				...(assignee ? { assignee } : {}),
				...(priority ? { priority } : {}),
			});
		}
	}
}
