import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersStateName } from './models/users-state.models';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './effects/users.effects';
import { usersReducers } from './reducers/users.reducer';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		StoreModule.forFeature(UsersStateName, usersReducers),
		EffectsModule.forFeature([UsersEffects])
	]
})
export class UsersModule { }