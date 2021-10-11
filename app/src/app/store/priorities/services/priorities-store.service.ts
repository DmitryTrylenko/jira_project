import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PriorityModel, PrioritiesState } from '../models/priorities-state.models';
import { requestPriority } from '../actions/priorities.actions';
import { selectAllPriorities } from '../selectors/priorities.selectors';


@Injectable({
	providedIn: 'root'
})

export class PrioritiesStoreService {
	public get priorities(): Observable<PriorityModel[]> {
		return this.store.pipe(select(selectAllPriorities)) as Observable<PriorityModel[]>;
	}

	constructor(private store: Store<PrioritiesState>) { }

	public requestPriority(): void {
		this.store.dispatch(requestPriority({}));
	}
}
