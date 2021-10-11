import { Injectable } from '@angular/core';

import { StatusModel } from '../models/statuses-state.models';
import { Params } from '../../../models/common-models';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusesService {
  constructor(private httpClient: HttpClient) {}

	public getStatusesList(params?: Params): Observable<StatusModel[]> {
		return this.httpClient.get<StatusModel[]>(`statuses`, { params: params as unknown as HttpParams });
	}
}
