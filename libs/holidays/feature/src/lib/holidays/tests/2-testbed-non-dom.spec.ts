import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createHoliday } from '@eternal/holidays/model';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BrochureSender } from '../../brochure-sender.service';
import { HolidaysComponent } from '../holidays.component';

describe('TestBed-based test without DOM Interaction', () => {
  let fixture: ComponentFixture<HolidaysComponent>;
  let component: HolidaysComponent;
  let store: MockStore;
  let matSnackBarMock: { open: () => void };
  let brochureSender: BrochureSender;

  beforeEach(() => {
    matSnackBarMock = { open: jest.fn() };
    fixture = TestBed.configureTestingModule({
      declarations: [HolidaysComponent],
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState: { holiday: { holidays: [] } } }),
        { provide: MatSnackBar, useValue: matSnackBarMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).createComponent(HolidaysComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    brochureSender = TestBed.inject(BrochureSender);
    jest.spyOn(brochureSender, 'send').mockReturnValue(of(true));
  });

  it('should instantiate', () => {
    expect(true).toBe(true);
  });

  it('should verify holidays are loaded', (done) => {
    const holiday = createHoliday();
    jest
      .spyOn(store, 'dispatch')
      .mockImplementation(() => store.setState({ holiday: { holidays: [holiday] } }));
    fixture.detectChanges();

    component.holidays$.subscribe((holidays) => {
      expect(holidays).toEqual([holiday]);
      done();
    });
  });

  it('should verify that the brochure is sent for a valid address', () => {
    const holiday = createHoliday();
    store.setState({ holidays: { holidays: [holiday] } });

    fixture.componentInstance.handleAddressGetterDone(
      {
        address: 'Domgasse 5, 1010 Wien',
        isValid: true
      },
      holiday
    );

    expect(brochureSender.send).toHaveBeenCalledWith('Domgasse 5, 1010 Wien', holiday);
    expect(matSnackBarMock.open).toHaveBeenCalledWith('Brochure has been sent. Thank you!', 'OK');
  });
});
