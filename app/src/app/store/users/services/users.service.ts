import { Injectable } from '@angular/core';

import { UserModel } from '../models/users-state.models';
import { Params } from '../../../models/common-models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	constructor(private httpClient: HttpClient) { }

	public getUsersList(params?: Params): Observable<UserModel[]> {
		return this.httpClient.get<UserModel[]>(`users/`, { params: params as unknown as HttpParams });
	}
}
