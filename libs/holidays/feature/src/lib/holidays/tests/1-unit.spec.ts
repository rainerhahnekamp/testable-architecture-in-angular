import { MatSnackBar } from '@angular/material/snack-bar';
import { createHoliday, Holiday } from '@eternal/holidays/model';
import { assertType } from '@eternal/shared/util';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { skip } from 'rxjs/operators';
import { BrochureSender } from '../../brochure-sender.service';
import { HolidaysComponent } from '../holidays.component';

describe('Holidays unit test', () => {
  it('should verify that the brochure is sent for a valid address', () => {
    const holiday = createHoliday({ id: 1 });
    const store = assertType<Store>({ select: () => of() });
    const snackBar = assertType<MatSnackBar>({ open: jest.fn(() => of(true)) });
    const brochureSender = assertType<BrochureSender>({ send: jest.fn(() => of(true)) });

    const component = new HolidaysComponent(store, brochureSender, snackBar);
    component.handleAddressGetterDone(
      {
        address: 'Domgasse 5, 1010 Wien',
        isValid: true
      },
      holiday
    );

    expect(brochureSender.send).toHaveBeenCalledWith('Domgasse 5, 1010 Wien', holiday);
    expect(snackBar.open).toHaveBeenCalledWith('Brochure has been sent. Thank you!', 'OK');
  });

  it('should verify that the brochure is showing an error message', () => {
    const store = assertType<Store>({ select: () => of() });
    const snackBar = assertType<MatSnackBar>({ open: jest.fn(() => of(true)) });
    const brochureSender = assertType<BrochureSender>({ send: jest.fn(() => throwError('500')) });

    const component = new HolidaysComponent(store, brochureSender, snackBar);
    component.handleAddressGetterDone(
      {
        address: '',
        isValid: true
      },
      createHoliday()
    );

    expect(snackBar.open).toHaveBeenCalledWith(
      'There was an error sending the request. Please contact us via e-mail',
      'OK'
    );
  });

  it('should request the holidays from the subscription', (done) => {
    const holidays = [{}, {}, {}].map(createHoliday);
    const holidays$ = new BehaviorSubject<Holiday[]>([]);

    const store = assertType<Store>({
      select: () => holidays$,
      dispatch: () => holidays$.next(holidays)
    });

    const component = new HolidaysComponent(
      store,
      assertType<BrochureSender>(),
      assertType<MatSnackBar>()
    );
    component.holidays$.pipe(skip(1)).subscribe((response) => {
      expect(response).toEqual(holidays);
      done();
    });

    component.ngOnInit();
  }, 1000);
});
