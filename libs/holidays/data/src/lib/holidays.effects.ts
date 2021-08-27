import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Holiday } from '@eternal/holidays/model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { holidaysActions } from './holidays.actions';

@Injectable()
export class HolidaysEffects {
  find$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.find),
      switchMap(() => this.httpClient.get<Holiday[]>('/assets/holidays.json')),
      map((holidays) => holidaysActions.findSuccess({ holidays }))
    )
  );

  constructor(private actions$: Actions, private httpClient: HttpClient) {}
}
