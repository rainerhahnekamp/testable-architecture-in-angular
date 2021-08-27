import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { fromHolidays, holidaysActions, HolidaysDataModule } from '@eternal/holidays/data';
import { createHoliday } from '@eternal/holidays/model';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

describe('Holidays Data', () => {
  let store: Store;
  let ctrl: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot([]),
        EffectsModule.forRoot([]),
        HolidaysDataModule,
        HttpClientTestingModule
      ]
    });
    store = TestBed.inject(Store);
    ctrl = TestBed.inject(HttpTestingController);
  });

  it('should have no holidays initially', (done) => {
    store.select(fromHolidays.get).subscribe((holidays) => {
      expect(holidays).toEqual([]);
      done();
    });
  });

  it('should load the holidays', (done) => {
    const [holiday1, holiday2] = [createHoliday(), createHoliday()];
    store.dispatch(holidaysActions.find());
    const req = ctrl.expectOne('/assets/holidays.json');
    req.flush([holiday1, holiday2]);
    store.select(fromHolidays.get).subscribe((holidays) => {
      expect(holidays).toEqual([holiday1, holiday2]);
      done();
    });
  });
});
