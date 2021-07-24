import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { concatMap, filter, tap } from 'rxjs/operators';
import { holidaysActions } from '../+state/holidays.actions';
import { fromHolidays } from '../+state/holidays.selectors';
import { AddressGetterComponent } from '../address-getter/address-getter.component';
import { BrochureSender } from '../brochure-sender.service';
import { Holiday } from '../holiday';

@Component({
  selector: 'eternal-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {
  holidays$ = this.store.select(fromHolidays.get);

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private brochureSender: BrochureSender,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(holidaysActions.find());
  }

  getBrochure(holiday: Holiday) {
    this.matDialog
      .open(AddressGetterComponent)
      .afterClosed()
      .pipe(
        filter((address) => !!address),
        concatMap((address) => this.brochureSender.send(address, holiday)),
        tap(() => this.snackBar.open('Brochure has been sent. Thank you!', 'OK'))
      );
  }

  showMore(holiday: Holiday) {}
}
