import { createAction, props } from '@ngrx/store';
import { UserModel } from '../models/users-state.models';
import { HttpErrorResponse } from '@angular/common/http';
import { Params } from '../../../models/common-models';

export const usersActionTypes = {
	requestUserMe: '[Users] Request user me',
	requestUserMeSuccess: '[Users] Request user me Success',
	requestUserMeFailure: '[Users] Request user me Failure'
};

export const requestUserMe = createAction(
	usersActionTypes.requestUserMe,
	props<{ params?: Params }>(),
);

export const requestUserMeSuccess = createAction(
	usersActionTypes.requestUserMeSuccess,
	props<{ users: UserModel[] }>()
);

export const requestUserMeFailure = createAction(
	usersActionTypes.requestUserMeFailure,
	props<{ error: HttpErrorResponse }>()
);