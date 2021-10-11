export const PrioritiesStateName = 'priorities';

export interface PrioritiesState {
	priorities: PriorityModel[] | undefined;
}

export interface PriorityModel {
	_id: string,
	priority: string,
}
