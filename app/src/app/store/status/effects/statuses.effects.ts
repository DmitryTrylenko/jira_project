import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { requestStatus, requestStatusSuccess, requestStatusFailure } from '../actions/statuses.actions';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { StatusesService } from '../services/statuses.service';
@Injectable()
export class StatusesEffects {
	public requestAllStatuses$ = createEffect(() => this.actions$
		.pipe(
			ofType(requestStatus),
			switchMap(({ params }) =>
				this.statusesService.getStatusesList(params)
					.pipe(
						map(statuses => requestStatusSuccess({ statuses })),
						catchError((error: HttpErrorResponse) => of(requestStatusFailure({ error })))
					)
			)
		)
	);

	constructor(private actions$: Actions, private statusesService: StatusesService) { }
}
