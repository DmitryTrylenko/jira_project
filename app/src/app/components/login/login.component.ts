import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form!: FormGroup;
	error!: string | null;
	isLoading = false;

	constructor(
		private authService: AuthorizationService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.form = new FormGroup({
			login: new FormControl('', [Validators.email]),
			password: new FormControl('', [Validators.pattern('[a-zA-Z0-9]{3,16}')])
		});
	}

	onSubmit(): void {
		this.error = null;
		this.isLoading = true;
		this.authService.login(this.normalizeInput(this.form)).pipe(
			finalize(() => this.isLoading = false)
		).subscribe(
			() => this.router.navigate(['/']),
			error => this.error = error.message
		);
	}

	private normalizeInput(form: FormGroup): { login: string; password: string } {
		return { login: form.value.login.trim(), password: form.value.password };
	}
}
