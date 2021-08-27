import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromHolidays, holidaysActions } from '@eternal/holidays/data';
import { Holiday } from '@eternal/holidays/model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BrochureSender } from '../brochure-sender.service';

@Component({
  selector: 'eternal-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  selectedHolidayId = 0;
  holidays$: Observable<Holiday[]> = this.store.select(fromHolidays.get);

  constructor(
    private store: Store,
    private brochureSender: BrochureSender,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.dispatch(holidaysActions.find());
  }

  getBrochure(holiday: Holiday) {
    this.selectedHolidayId = holiday.id;
  }

  handleAddressGetterDone(result: { address: string; isValid: boolean }, holiday: Holiday) {
    this.selectedHolidayId = 0;

    if (result.isValid) {
      this.brochureSender.send(result.address, holiday).subscribe(
        () => this.snackBar.open('Brochure has been sent. Thank you!', 'OK'),
        () =>
          this.snackBar.open(
            'There was an error sending the request. Please contact us via e-mail',
            'OK'
          )
      );
    }
  }
}
