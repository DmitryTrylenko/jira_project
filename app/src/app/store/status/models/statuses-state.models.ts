export const StatusesStateName = 'statuses';

export interface StatusesState {
	statuses: StatusModel[] | undefined;
}

export interface StatusModel {
	_id?: string,
	name: string,
	sortOrder: number,
	__v?: any,
}
