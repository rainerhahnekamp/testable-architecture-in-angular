import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HolidayCardComponent } from './holiday-card/holiday-card.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatButtonModule],
  declarations: [HolidayCardComponent],
  exports: [HolidayCardComponent]
})
export class HolidaysUiModule {}
