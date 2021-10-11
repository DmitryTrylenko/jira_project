import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { StatusesState, StatusModel, StatusesStateName } from '../models/statuses-state.models';

export const selectStatusesState = createFeatureSelector<StatusesState>(StatusesStateName);

export const selectAllStatuses: MemoizedSelector<StatusesState, StatusModel[] | undefined> = createSelector(
	selectStatusesState,
	(statusesState: StatusesState): StatusModel[] | undefined => statusesState.statuses
);