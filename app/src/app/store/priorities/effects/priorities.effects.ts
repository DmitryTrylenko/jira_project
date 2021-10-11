import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { requestPriority, requestPrioritySuccess, requestPriorityFailure } from '../actions/priorities.actions';
import { catchError, switchMap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { PrioritiesService } from '../services/priorities.service';
@Injectable()
export class PrioritiesEffects {
	public requestAllPriorities$ = createEffect(() => this.actions$
		.pipe(
			ofType(requestPriority),
			switchMap(() =>
				this.prioritiesService.getPrioritiesList()
					.pipe(
						map(priorities => requestPrioritySuccess({ priorities })),
						catchError((error: HttpErrorResponse) => of(requestPriorityFailure({ error })))
					)
			)
		)
	);

	constructor(private actions$: Actions, private prioritiesService: PrioritiesService) { }
}

