import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { holidaysActions } from '../+state/holidays.actions';
import { fromHolidays } from '../+state/holidays.selectors';
import { UserService } from '../../shared/user.service';
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
    private userService: UserService,
    private snackBar: MatSnackBar,
    private brochureSender: BrochureSender,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(holidaysActions.find());
  }

  getBrochure(holiday: Holiday) {
    this.userService.loadedUser$.subscribe((user) => {
      if (user.anonymous) {
        this.snackBar.open('You have to login first', 'OK', { verticalPosition: 'top' });
      }
    });
  }

  showMore(holiday: Holiday) {}
}
