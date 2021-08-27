import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Meta } from '@storybook/angular';
import { of } from 'rxjs';
import { HolidaysEffects } from '../+state/holidays.effects';
import { holidaysReducer } from '../+state/holidays.reducer';
import { Holiday } from '../holiday';
import { HolidaysComponent } from './holidays.component';

const defaultHoliday: Holiday = {
  id: 1,
  title: 'Vienna / Wien',
  teaser: 'Dive into the capital of the Habsburg empire',
  imageUrl: '/assets/vienna.jpg',
  description:
    'With a population of almost 2 million, Vienna is the second largest German-speaking city and breathes history in every corner.',
  typeId: 1,
  durationInDays: 7,
  minCount: 5,
  maxCount: 15
};

const defaultModuleConfig = (holiday: Partial<Holiday> = {}) => ({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    RouterTestingModule,
    StoreModule.forRoot({ holiday: holidaysReducer }),
    EffectsModule.forRoot([HolidaysEffects])
  ],
  providers: [
    {
      provide: HttpClient,
      useValue: {
        get: () => of<Holiday[]>([{ ...defaultHoliday, ...holiday }])
      }
    }
  ]
});

const createStory = (holiday: Partial<Holiday> = {}) => ({
  moduleMetadata: defaultModuleConfig(holiday)
});

export default {
  title: 'Eternal/HolidayCard',
  component: HolidaysComponent
} as Meta;

export const Default = () => createStory();

export const Minimal = () =>
  createStory({
    title: 'Vienna',
    teaser: 'Teaser',
    description: 'Description'
  });

export const Overflown = () =>
  createStory({
    title: 'A very long city name which does not fit within a line',
    teaser:
      'This is also a very long teaser text which surely does not fit within two lines. The 3rd line is hidden',
    description:
      'Eventually also an extremly long description where we simply have to limit the amount of lines to a maximum of three. We are still continuing here with some further text.'
  });

export const SoldOut = () => createStory({ soldOut: true });

export const Empty = () =>
  createStory({
    title: '',
    teaser: '',
    description: '',
    imageUrl: ''
  });

export const TinyImage = () =>
  createStory({
    imageUrl: '/assets/vienna-small.jpg'
  });

export const OnSale = () => createStory({ onSale: true });

export const SaleAndSold = () => createStory({ onSale: true, soldOut: true });
