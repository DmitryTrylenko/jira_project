import { Schema, model } from 'mongoose';

interface Status {
	_id?: string,
	name: string,
	sortOrder: number,
	__v?: any,
}

const StatusSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	sortOrder: {
		type: Number,
		required: true,
	},
});

export const StatusModel = model('status', StatusSchema);

export function getStatuses(): Promise<Status> {
	return StatusModel.find({}, { __v: 0 }).sort({ sortOrder: 1 });
}

export function findStatus(id: string): Promise<Status> {
	return StatusModel.findOne({ _id: id }, { __v: 0 });
}

export function deleteStatus(id: string): Promise<Status> {
	return StatusModel.deleteOne({ _id: id });
}

export function createStatus(status: Status): Promise<Status> {
	return new StatusModel(status).save();
}

export function updateStatus(status: Status): Promise<Status> {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	const { _id, name, sortOrder } = status;
	return StatusModel.updateOne(
		{ _id },
		{ $set: { name, sortOrder } },
	);
}
