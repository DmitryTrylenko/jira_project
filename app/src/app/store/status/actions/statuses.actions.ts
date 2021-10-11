import { createAction, props } from '@ngrx/store';
import { StatusModel } from '../models/statuses-state.models';
import { HttpErrorResponse } from '@angular/common/http';
import { Params } from '../../../models/common-models';

export const statusesActionTypes = {
	requestStatus: '[Status] Request status me',
	requestStatusSuccess: '[Status] Request status me Success',
	requestStatusFailure: '[Status] Request status me Failure'
};

export const requestStatus = createAction(
	statusesActionTypes.requestStatus,
	props<{ params?: Params }>()
);

export const requestStatusSuccess = createAction(
	statusesActionTypes.requestStatusSuccess,
	props<{ statuses: StatusModel[] }>()
);

export const requestStatusFailure = createAction(
	statusesActionTypes.requestStatusFailure,
	props<{ error: HttpErrorResponse }>()
);