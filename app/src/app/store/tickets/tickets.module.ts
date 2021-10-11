import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsStateName } from './models/tickets-state.model';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TicketsEffects } from './effects/tickets.effects';
import { ticketsReducers } from './reducers/tickets.reducer';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature(TicketsStateName, ticketsReducers),
		EffectsModule.forFeature([TicketsEffects])
	]
})
export class TicketsModule { }