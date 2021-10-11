import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserModel } from '../store/users/models/users-state.models';
@Injectable({
	providedIn: 'root'
})
export class SignupService {
	private url = 'http://localhost:3000';
	constructor(private http: HttpClient) { }

	getAll() {
		return this.http.get<UserModel[]>(`${this.url}/users`);
	}

	register(user: UserModel) {
		return this.http.post(`${this.url}/auth/registration`, { user });
	}

	delete(id: number) {
		return this.http.delete(`${this.url}/users/${id}`);
	}
}
