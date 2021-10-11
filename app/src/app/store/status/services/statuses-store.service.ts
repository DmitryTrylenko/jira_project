import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StatusModel, StatusesState } from '../models/statuses-state.models';
import { requestStatus } from '../actions/statuses.actions';
import { selectAllStatuses } from '../selectors/statuses.selectors';


@Injectable({
	providedIn: 'root'
})

export class StatusesStoreService {
	public get statuses$(): Observable<StatusModel[]> {
		return this.store.pipe(select(selectAllStatuses)) as Observable<StatusModel[]>;
	}

	constructor(private store: Store<StatusesState>) { }

	public requestStatus(): void {
		this.store.dispatch(requestStatus({}));
	}
}
