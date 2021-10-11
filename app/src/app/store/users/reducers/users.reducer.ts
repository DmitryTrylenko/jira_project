import { ActionReducerMap } from '@ngrx/store';
import { UsersState, UserModel } from '../models/users-state.models';
import { Action, createReducer, on } from '@ngrx/store';
import {
	requestUserMe,
	requestUserMeSuccess,
} from '../actions/users.actions';

export const usersReducers: ActionReducerMap<UsersState> = {
	users: usersListReducer,
};

const reducer = createReducer<UserModel[] | undefined>(
	undefined,
	on(requestUserMe, () => undefined),
	on(requestUserMeSuccess, (state, { users }) => users)
);

function usersListReducer(state: UserModel[] | undefined, action: Action) {
	return reducer(state, action);
}
