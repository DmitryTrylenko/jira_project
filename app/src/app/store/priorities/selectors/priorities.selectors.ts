import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { PrioritiesState, PriorityModel, PrioritiesStateName } from '../models/priorities-state.models';

export const selectPrioritiesState = createFeatureSelector<PrioritiesState>(PrioritiesStateName);

export const selectAllPriorities: MemoizedSelector<PrioritiesState, PriorityModel[] | undefined> = createSelector(
	selectPrioritiesState,
	(prioritiesState: PrioritiesState): PriorityModel[] | undefined => prioritiesState.priorities
);