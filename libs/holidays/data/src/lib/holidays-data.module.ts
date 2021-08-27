import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HolidaysEffects } from './holidays.effects';
import { holidaysFeatureKey, holidaysReducer } from './holidays.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(holidaysFeatureKey, holidaysReducer),
    EffectsModule.forFeature([HolidaysEffects])
  ]
})
export class HolidaysDataModule {}
