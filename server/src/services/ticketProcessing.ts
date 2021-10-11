import { PrioritiesModel } from '../priority/priority.model';
import { StatusModel } from '../status/status.model';
import { UserModel } from '../users/users.model';

export async function ticketProcessing(ticketData: any) {
	const ticketReporter = await UserModel.find({ _id: ticketData.reporter._id });
	const ticketAssignee = await UserModel.find({ _id: ticketData.assignee._id });
	const ticketPriority = await PrioritiesModel.find({ _id: ticketData.priority._id });
	const ticketStatus = await StatusModel.find({ _id: ticketData.status._id });

	return {
		...ticketData,
		reporter: ticketReporter[0]._id,
		assignee: ticketAssignee[0]._id,
		priority: ticketPriority[0]._id,
		status: ticketStatus[0]._id,
	};
}
