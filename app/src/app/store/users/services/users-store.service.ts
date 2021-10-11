import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserModel, UsersState } from '../models/users-state.models';
import { requestUserMe } from '../actions/users.actions';
import { selectAllUsers } from '../selectors/users.selectors';


@Injectable({
	providedIn: 'root'
})

export class UsersStoreService {
	public get users(): Observable<UserModel[]> {
		return this.store.pipe(select(selectAllUsers)) as Observable<UserModel[]>;
	}

	constructor(private store: Store<UsersState>) { }

	public requestUserMe(): void {
		this.store.dispatch(requestUserMe({}));
	}
}
