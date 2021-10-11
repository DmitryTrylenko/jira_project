import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { requestUserMe, requestUserMeSuccess, requestUserMeFailure } from '../actions/users.actions';
import { catchError, switchMap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { UsersService } from '../services/users.service';
@Injectable()
export class UsersEffects {
	public requestAllTickets$ = createEffect(() => this.actions$
		.pipe(
			ofType(requestUserMe),
			switchMap(({ params }) =>
				this.usersService.getUsersList(params)
					.pipe(
						map(users => requestUserMeSuccess({ users })),
						catchError((error: HttpErrorResponse) => of(requestUserMeFailure({ error })))
					)
			)
		)
	);

	constructor(private actions$: Actions, private usersService: UsersService) { }
}
