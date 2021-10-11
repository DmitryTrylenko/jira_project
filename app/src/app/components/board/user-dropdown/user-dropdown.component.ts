import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/services/login.service';

@Component({
	selector: 'app-user-dropdown',
	templateUrl: './user-dropdown.component.html',
	styleUrls: ['./user-dropdown.component.scss']
})
export class UserDropdownComponent {
	userName = localStorage.getItem('userName');
	constructor(private authService: AuthorizationService) { }

	logout(): void { this.authService.logout() }
}
