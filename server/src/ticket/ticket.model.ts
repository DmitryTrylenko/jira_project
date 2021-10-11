import { Schema, model } from 'mongoose';

interface TicketFilter {
	name?: string,
	date?: string,
	priority?: string,
}
export interface TicketDb {
	title: string,
	body: string,
	dateCreated: Date
	lastUpdated: Date,
	ticketNumber: string,
	reporter: Schema.Types.ObjectId,
	assignee: Schema.Types.ObjectId,
	priorities: Schema.Types.ObjectId,
	status: Schema.Types.ObjectId,
}

export interface TicketFE {
	dateCreated: Date | string;
	lastUpdated: Date | string;
	reporter: {
		_id: string,
		name?: string,
	}
	assignee: {
		_id: string,
		name?: string,
	},
	title: string;
	ticketNumber: string;
	body?: string;
	priority: {
		_id: string,
		priority?: string,
	};
	status: {
		_id: string;
		name?: string;
		sortOrder?: number;
	};
	_id?: string;
}

const TicketSchema = new Schema<TicketDb>({
	title: {
		type: String,
		required: true,
	},
	body: String,
	dateCreated: String,
	lastUpdated: {
		type: Date,
		default: Date.now,
	},
	ticketNumber: {
		type: String,
		required: true,
	},
	reporter: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	assignee: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	priority: {
		type: Schema.Types.ObjectId,
		ref: 'priorities',
	},
	status: {
		type: Schema.Types.ObjectId,
		ref: 'status',
		default: '',
	},
});

export const TicketModel = model('ticket', TicketSchema);

export async function saveTicket(ticket: TicketDb): Promise<TicketFE> {
	const newTicket = await new TicketModel(ticket).save();

	return newTicket.populate({ path: 'reporter', select: 'name' })
		.populate({ path: 'assignee', select: 'name avaColor' })
		.populate({ path: 'status', select: 'name' })
		.populate({ path: 'priority', select: 'priority' })
		.execPopulate();
}

export function findTicketDoc(id: string): Promise<TicketDb> {
	return TicketModel.findOne({ _id: id }, { __v: 0 });
}

export function findTicket(id: string): Promise<TicketFE> {
	return TicketModel.findOne({ _id: id }, { __v: 0 })
		.populate({ path: 'reporter', select: 'name' })
		.populate({ path: 'assignee', select: 'name avaColor' })
		.populate({ path: 'status', select: 'name' })
		.populate({ path: 'priority', select: 'priority' });
}

export function findLatestTicket(): Promise<TicketDb> {
	return TicketModel.find({}).sort({ _id: -1 }).limit(1);
}

export async function updateTicket(id: string, data: Partial<TicketDb>): Promise<any> {
	await TicketModel.updateOne({ _id: id }, { $set: data });
	const updated = await findTicket(id);

	return updated;
}

export function deleteTicketsByStatus(statusId: string): Promise<TicketDb> {
	return TicketModel.deleteMany({ status: statusId });
}

export function findTicketsByFilter(filter: TicketFilter) {
	return TicketModel.find(filter);
}
