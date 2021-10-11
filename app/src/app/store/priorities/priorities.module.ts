import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrioritiesStateName } from './models/priorities-state.models';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PrioritiesEffects } from './effects/priorities.effects';
import { prioritiesReducers } from './reducers/priorities.reducer';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature(PrioritiesStateName, prioritiesReducers),
		EffectsModule.forFeature([PrioritiesEffects])
	]
})
export class PrioritiesModule { }