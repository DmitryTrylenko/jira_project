import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { AuthorizationService } from './services/login.service';
import { BoardComponent } from './components/board/board.component';
import { SignupComponent } from './components/signup/signup.component';
import { ListComponent } from './components/board/list/list.component';
import { ColumnsComponent } from './components/board/columns/columns.component';
import { TicketComponent } from './components/board/ticket/ticket.component';
import { RootStoreModule } from './store/root-store.module';
import { httpInterceptorProviders } from './interceptors/http-interceptor';
import { FilterComponent } from './components/filter/filter.component';
import { UserDropdownComponent } from './components/board/user-dropdown/user-dropdown.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TicketEditComponent } from './components/board/ticket-edit/ticket-edit.component';
import { TicketCreateComponent } from './components/board/ticket-create/ticket-create.component';
import { NgDragDropModule } from 'ng-drag-drop';

@NgModule({
	declarations: [
		AppComponent,
		ListComponent,
		LoginComponent,
		BoardComponent,
		SignupComponent,
		ColumnsComponent,
		TicketComponent,
		TicketEditComponent,
		FilterComponent,
		UserDropdownComponent,
		TicketCreateComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		RootStoreModule,
		NgbModule,
		MDBBootstrapModule,
		MatInputModule,
		NgDragDropModule.forRoot(),
	],
	providers: [
		AuthorizationService,
		httpInterceptorProviders,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
