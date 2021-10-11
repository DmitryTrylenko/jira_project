import { Injectable } from '@angular/core';

import { PriorityModel } from '../models/priorities-state.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class PrioritiesService {
	constructor(private httpClient: HttpClient) { }

	public getPrioritiesList(): Observable<PriorityModel[]> {
		return this.httpClient.get<PriorityModel[]>(`priorities/`);
	}
}
