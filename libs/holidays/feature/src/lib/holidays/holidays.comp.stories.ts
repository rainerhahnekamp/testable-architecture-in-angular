import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Meta, moduleMetadata } from '@storybook/angular';
import { HolidaysEffects } from '../+state/holidays.effects';
import { holidaysReducer } from '../+state/holidays.reducer';
import { AddressGetterComponent } from '../address-getter/address-getter.component';
import { BrochureSenderInterceptor } from '../brochure-sender.interceptor';
import { HolidaysComponent } from './holidays.component';

export default {
  title: 'Eternal/Component/Holidays',
  component: HolidaysComponent,
  decorators: [
    moduleMetadata({
      declarations: [AddressGetterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({ holiday: holidaysReducer }),
        EffectsModule.forRoot([HolidaysEffects])
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          multi: true,
          useClass: BrochureSenderInterceptor
        }
      ]
    })
  ]
} as Meta;

export const Default = () => ({});
