import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthorizationService } from 'src/app/services/login.service';
import { SignupService } from 'src/app/services/signup.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
	registerForm!: FormGroup;
	error!: string | null;
	loading = false;
	submitted = false;

	constructor(
		private router: Router,
		private loginService: AuthorizationService,
		private signupService: SignupService,
	) {	}

	ngOnInit(): void {
		this.registerForm = new FormGroup({
			name: new FormControl('', [Validators.pattern('[a-zA-Z0-9]{3,16}')]),
			email: new FormControl('', [Validators.email]),
			password: new FormControl('', [Validators.pattern('[a-zA-Z0-9]{3,16}')])
		});
	}

	get f() { return this.registerForm.controls; }

	onSubmit(): void {
		this.submitted = true;

		if (this.registerForm.invalid) {
			return;
		}

		this.error = null;
		this.loading = true;
		this.registerForm.value["avaColor"] = Math.random().toString(16).substr(2, 6);
		this.signupService.register(this.registerForm.value)
			.pipe(first())
			.subscribe(
				() => this.router.navigate(['/login']),
				error => this.error = error.message
			);
	}
}
