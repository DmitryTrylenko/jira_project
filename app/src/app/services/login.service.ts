import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
	providedIn: 'root'
})
export class AuthorizationService {
	private url = 'http://localhost:3000';

	get isLoggedIn(): boolean {
		return !!this.token;
	}

	get token() {
		return localStorage.getItem('token');
	}
	constructor(private httpClient: HttpClient, private router: Router) { }

	login({ login, password }: { login: string; password: string }) {
		return this.httpClient.post(`${this.url}/auth/login`, { email: login, password })
			.pipe(
				tap((data: any) => this.saveData(data.token, data._id, data.name))
			);
	}

	logout(): void {
		localStorage.removeItem('token')
		localStorage.removeItem('userId');
		this.router.navigate(['/login']);
	}

	private saveData(token: string, currentUserId: string, userName: string): void {
		localStorage.setItem('token', token);
		localStorage.setItem('userId', currentUserId);
		localStorage.setItem('userName', userName);
	}
}
