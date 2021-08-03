import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { BrochureSender } from '../../brochure-sender.service';
import { createHoliday } from '../../holiday';
import { HolidaysComponent } from '../holidays.component';

describe('TestBed-based test with DOM Interaction', () => {
  @Component({ selector: 'eternal-address-getter', template: '' })
  class MockedAddressGetterComponent {
    @Output() done = new EventEmitter<{}>();
  }

  let fixture: ComponentFixture<HolidaysComponent>;
  let component: HolidaysComponent;
  let store: MockStore;
  let matSnackBar: MatSnackBar;
  let brochureSender: BrochureSender;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [HolidaysComponent, MockedAddressGetterComponent],
      imports: [MatCardModule, MatIconModule, MatSnackBarModule, HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState: { holiday: { holidays: [] } } })
        // { provide: MatSnackBar, useValue: matSnackBarMock }
      ]
    }).createComponent(HolidaysComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    brochureSender = TestBed.inject(BrochureSender);
    jest.spyOn(brochureSender, 'send').mockReturnValue(of(true));
    matSnackBar = TestBed.inject(MatSnackBar);
    jest.spyOn(matSnackBar, 'open');
  });

  it('should instantiate the component', () => {
    expect(true).toBe(true);
  });

  it('should verify holidays are shown', fakeAsync(() => {
    const holiday = createHoliday({ id: 1, title: 'Bangkok / กรุงเทพมหานคร' });
    jest
      .spyOn(store, 'dispatch')
      .mockImplementation(() => store.setState({ holiday: { holidays: [holiday] } }));
    fixture.detectChanges();

    const matTitle = fixture.debugElement.query(By.css('[data-test=holiday-1] mat-card-title'))
      .nativeElement as HTMLElement;

    expect(matTitle.textContent).toEqual('Bangkok / กรุงเทพมหานคร');
  }));

  it('should show the address getter on selected holiday instead of the card', () => {
    const holiday = createHoliday({ id: 1, title: 'Bangkok / กรุงเทพมหานคร' });
    jest
      .spyOn(store, 'dispatch')
      .mockImplementation(() => store.setState({ holiday: { holidays: [holiday] } }));
    component.selectedHolidayId = 1;
    fixture.detectChanges();

    const holidayCard = fixture.debugElement.query(By.css('[data-test=holiday-1]'));
    const addressGetter = fixture.debugElement.query(
      By.css('eternal-address-getter')
    ).nativeElement;

    expect(holidayCard).toBeNull();
    expect(addressGetter).toBeTruthy();
  });

  it('should send the brochure on a valid address', () => {
    const holiday = createHoliday({ id: 1, title: 'Bangkok / กรุงเทพมหานคร' });
    jest
      .spyOn(store, 'dispatch')
      .mockImplementation(() => store.setState({ holiday: { holidays: [holiday] } }));
    component.selectedHolidayId = 1;
    fixture.detectChanges();
    const addressGetter = fixture.debugElement.query(By.directive(MockedAddressGetterComponent));
    addressGetter.triggerEventHandler('done', {
      address: 'Domgasse 5, 1010 Wien',
      isValid: true
    });

    expect(brochureSender.send).toHaveBeenCalledWith('Domgasse 5, 1010 Wien', holiday);
    expect(matSnackBar.open).toHaveBeenCalledWith('Brochure has been sent. Thank you!', 'OK');
  });
});
