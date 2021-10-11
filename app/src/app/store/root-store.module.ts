import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsModule } from './tickets/tickets.module';
import { UsersModule } from './users/users.module';
import { StatusesModule } from './status/statuses.module';
import { PrioritiesModule } from './priorities/priorities.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, reducers } from './root-state.reducer';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		TicketsModule,
		UsersModule,
		StatusesModule,
		PrioritiesModule,
		StoreModule.forRoot(reducers, { metaReducers }),
		EffectsModule.forRoot([]),
	]
})
export class RootStoreModule { }