import { Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { marbles } from 'rxjs-marbles/jest';
import { map } from 'rxjs/operators';
import { assertType } from '../../../assert-type';
import { BrochureSender } from '../../brochure-sender.service';
import { createHoliday } from '../../holiday';
import { HolidaysComponent } from '../holidays.component';

describe('Holidays RxJs test', () => {
  it(
    'should verify that the find action is dispatched',
    marbles((m) => {
      let findActionTriggered = false;
      const holiday = createHoliday();
      const source$ = m.cold('a').pipe(map(() => (findActionTriggered ? [holiday] : [])));
      const store = assertType<Store>({
        select: () => source$,
        dispatch: (action: TypedAction<string>) =>
          (findActionTriggered = action.type === '[Holidays] Find')
      });

      const component = new HolidaysComponent(
        store,
        assertType<BrochureSender>(),
        assertType(BrochureSender)
      );
      component.ngOnInit();
      m.expect(component.holidays$).toBeObservable('h', { h: [holiday] });
    })
  );
});
