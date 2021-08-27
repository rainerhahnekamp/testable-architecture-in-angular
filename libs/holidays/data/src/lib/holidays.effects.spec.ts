// for demonstration purposes only. module.spec.ts is already covering effects. no need for this one

import { HttpClient } from '@angular/common/http';
import { holidaysActions } from '@eternal/holidays/data';
import { createHoliday } from '@eternal/holidays/model';
import { assertType } from '@eternal/shared/util';
import { marbles } from 'rxjs-marbles/jest';
import { HolidaysEffects } from './holidays.effects';

describe('Holiday Effects', () => {
  it(
    'should emit findSuccess after find',
    marbles((m) => {
      const [holiday1, holiday2] = [createHoliday(), createHoliday()];

      const actions$ = m.cold('a', { a: holidaysActions.find() });
      const httpClient$ = { get: () => m.cold('500ms h', { h: [holiday1, holiday2] }) };
      const effects = new HolidaysEffects(actions$, assertType<HttpClient>(httpClient$));

      m.expect(effects.find$).toBeObservable('500ms a', {
        a: holidaysActions.findSuccess({ holidays: [holiday1, holiday2] })
      });
    })
  );
});
