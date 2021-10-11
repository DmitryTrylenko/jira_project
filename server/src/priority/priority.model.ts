import { Schema, model } from 'mongoose';

import { PriorityModel } from '../../../app/src/app/store/priorities/models/priorities-state.models';

const PrioritySchema = new Schema({
	priority: {
		type: String,
		required: true,
		enum: ['Low', 'Medium', 'High'],
	},
});

export const PrioritiesModel = model('priorities', PrioritySchema);

export function getPriorities(): Promise<PriorityModel> {
	return PrioritiesModel.find({}, { __v: 0 });
}
