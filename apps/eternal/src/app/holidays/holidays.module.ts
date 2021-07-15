import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { HolidaysEffects } from './+state/holidays.effects';
import { holidaysFeatureKey, holidaysReducer } from './+state/holidays.reducer';
import { HolidaysComponent } from './holidays/holidays.component';

@NgModule({
  declarations: [HolidaysComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HolidaysComponent
      }
    ]),
    StoreModule.forFeature(holidaysFeatureKey, holidaysReducer),
    EffectsModule.forFeature([HolidaysEffects]),
    SharedModule
  ]
})
export class HolidaysModule {}
