import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusesStateName } from './models/statuses-state.models';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StatusesEffects } from './effects/statuses.effects';
import { statusesReducers } from './reducers/statuses.reducer';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature(StatusesStateName, statusesReducers),
		EffectsModule.forFeature([StatusesEffects])
	]
})
export class StatusesModule { }