import { Holiday } from '@eternal/holidays/model';
import { createReducer, on } from '@ngrx/store';
import { holidaysActions } from './holidays.actions';

export const holidaysFeatureKey = 'holiday';

export interface HolidaysState {
  holidays: Holiday[];
}

const initialState: HolidaysState = { holidays: [] };

export const holidaysReducer = createReducer<HolidaysState>(
  initialState,
  on(holidaysActions.findSuccess, (state, { holidays }) => ({
    ...state,
    holidays
  }))
);
