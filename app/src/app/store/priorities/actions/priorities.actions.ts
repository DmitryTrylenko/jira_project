import { createAction, props } from '@ngrx/store';
import { PriorityModel } from '../models/priorities-state.models';
import { HttpErrorResponse } from '@angular/common/http';
import { Params } from '../../../models/common-models';

export const prioritiesActionTypes = {
	requestPriority: '[Priorities] Request priorities me',
	requestPrioritySuccess: '[Priorities] Request priorities me Success',
	requestPriorityFailure: '[Priorities] Request priorities me Failure'
};

export const requestPriority = createAction(
	prioritiesActionTypes.requestPriority,
	props<{ params?: Params }>(),
);

export const requestPrioritySuccess = createAction(
	prioritiesActionTypes.requestPrioritySuccess,
	props<{ priorities: PriorityModel[] }>(),
);

export const requestPriorityFailure = createAction(
	prioritiesActionTypes.requestPrioritySuccess,
	props<{ error: HttpErrorResponse }>(),
);