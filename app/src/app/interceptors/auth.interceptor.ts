import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/login.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService: AuthorizationService) { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (!request.url.includes('auth')) {
			request = request.clone({
				url: `${environment.apiBase}/${request.url}`,
				setHeaders: { Authorization: `Bearer ${this.authService.token}` }
			});
		}
		return next.handle(request);
	}
}
