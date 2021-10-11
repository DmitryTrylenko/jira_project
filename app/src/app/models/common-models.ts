export interface Params {
	page: number;
	limit: number;
	assignee?: string;
	priority?: string;
	dateCreated?: string;
}
export interface DataPagination {
	count: number;
	limit: number;
	currentPage?: number
}
