import { ActionReducerMap } from '@ngrx/store';
import { StatusesState } from '../models/statuses-state.models';
import { StatusModel } from '../models/statuses-state.models';
import { Action, createReducer, on } from '@ngrx/store';
import {
	requestStatus,
	requestStatusSuccess,
} from '../actions/statuses.actions';

export const statusesReducers: ActionReducerMap<StatusesState> = {
	statuses: statusesListReducer,
};

const reducer = createReducer<StatusModel[] | undefined>(
	undefined,
	on(requestStatus, () => undefined),
	on(requestStatusSuccess, (state, { statuses }) => statuses)
);

function statusesListReducer(state: StatusModel[] | undefined, action: Action) {
	return reducer(state, action);
}
