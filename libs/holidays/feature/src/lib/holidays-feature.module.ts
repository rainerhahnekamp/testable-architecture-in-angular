import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { HolidaysDataModule } from '@eternal/holidays/data';
import { HolidaysUiModule } from '@eternal/holidays/ui';
import { SharedAddressGetterModule } from '@eternal/shared/address-getter';
import { BrochureSenderInterceptor } from './brochure-sender.interceptor';
import { HolidaysComponent } from './holidays/holidays.component';

@NgModule({
  declarations: [HolidaysComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HolidaysComponent
      }
    ]),
    MatSnackBarModule,
    HolidaysDataModule,
    HolidaysUiModule,
    SharedAddressGetterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: BrochureSenderInterceptor
    }
  ]
})
export class HolidaysFeatureModule {}
