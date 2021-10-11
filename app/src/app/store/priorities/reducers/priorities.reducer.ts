import { ActionReducerMap } from '@ngrx/store';
import { PrioritiesState } from '../models/priorities-state.models';
import { PriorityModel } from '../models/priorities-state.models';
import { Action, createReducer, on } from '@ngrx/store';
import {
	requestPriority,
	requestPrioritySuccess,
} from '../actions/priorities.actions';

export const prioritiesReducers: ActionReducerMap<PrioritiesState> = {
	priorities: prioritiesListReducer,
};

const reducer = createReducer<PriorityModel[] | undefined>(
	undefined,
	on(requestPriority, () => undefined),
	on(requestPrioritySuccess, (state, { priorities }) => priorities)
);

function prioritiesListReducer(state: PriorityModel[] | undefined, action: Action) {
	return reducer(state, action);
}
