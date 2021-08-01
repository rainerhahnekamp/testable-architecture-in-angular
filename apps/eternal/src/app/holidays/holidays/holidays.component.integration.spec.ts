import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HolidaysEffects } from '../+state/holidays.effects';
import { holidaysFeatureKey, holidaysReducer } from '../+state/holidays.reducer';
import { createHoliday } from '../holiday';
import { HolidaysComponent } from './holidays.component';

describe('Holidays integration test', () => {
  const setup = () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [HolidaysComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        StoreModule.forRoot({ [holidaysFeatureKey]: holidaysReducer }),
        EffectsModule.forRoot([HolidaysEffects])
      ]
    }).createComponent(HolidaysComponent);
    fixture.detectChanges();
    const httpController = TestBed.inject(HttpTestingController);
    return { fixture, httpController };
  };
  it('should show instantiate', () => {
    const { fixture } = setup();
    expect(fixture).toBeInstanceOf(ComponentFixture);
  });

  it('should show holidays', () => {
    const { fixture, httpController } = setup();

    const req = httpController.expectOne((req) => !!req.url.match(/holidays/));
    req.flush([createHoliday({ title: 'Paris' }), createHoliday({ title: 'Rome / Roma' })]);
    fixture.detectChanges();

    const holidayTitles = fixture.debugElement
      .queryAll(By.css('mat-card-title'))
      .map((matCardTitle) => (matCardTitle.nativeElement as HTMLElement).textContent);

    expect(holidayTitles).toEqual(['Paris', 'Rome / Roma']);
  });

  it('should send the brochure on valid address', fakeAsync(() => {
    const { fixture, httpController } = setup();

    try {
      const req = httpController.expectOne('/assets/holidays.json');
      req.flush([createHoliday()]);
      fixture.detectChanges();

      const brochureButton = fixture.debugElement.query(By.css('[data-test=btn-brochure]'))
        .nativeElement as HTMLButtonElement;
      brochureButton.click();
      tick();
      fixture.detectChanges();
    } catch (err) {
      console.log(err);
    }
  }));
});
