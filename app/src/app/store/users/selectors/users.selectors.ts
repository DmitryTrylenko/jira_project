import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UsersState, UserModel, UsersStateName } from '../models/users-state.models';

export const selectUsersState = createFeatureSelector<UsersState>(UsersStateName);

export const selectAllUsers: MemoizedSelector<UsersState, UserModel[] | undefined> = createSelector(
	selectUsersState,
	(usersState: UsersState): UserModel[] | undefined => usersState.users
);