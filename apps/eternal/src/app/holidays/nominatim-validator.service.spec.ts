import { HttpClient, HttpParams } from '@angular/common/http';
import { asyncScheduler, of, scheduled } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';
import { assertType } from '../assert-type';
import { NominatimValidator } from './nominatim-validator.service';
import DoneCallback = jest.DoneCallback;

describe('Nominatim Validator', () => {
  it.each<any>([
    [true, ['a']],
    [true, [false, null, 0]],
    [false, []]
  ])(`should return %s for %s`, (expected: boolean, response: string[], done: DoneCallback) => {
    const httpClient = assertType<HttpClient>({ get: () => scheduled([response], asyncScheduler) });
    const lookuper = new NominatimValidator(httpClient);
    lookuper.validate('Domgasse 5').subscribe((isValid) => {
      expect(isValid).toBe(expected);
      done();
    });
  });

  it('should call nominatim with right parameters', () => {
    const httpClient = { get: jest.fn((url: string, options: { params: HttpParams }) => of([])) };
    const lookuper = new NominatimValidator(assertType<HttpClient>(httpClient));

    lookuper.validate('Domgasse 5');

    expect(httpClient.get).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/search.php', {
      params: new HttpParams().set('format', 'jsonv2').set('q', 'Domgasse 5')
    });
  });

  it('should throw an error if no street number is given', () => {
    const lookuper = new NominatimValidator(assertType<HttpClient>(null));

    expect(() => lookuper.validate('Domgasse')).toThrowError('Address without street number');
  });

  it(
    'should use rxjs-marbles',
    marbles((m) => {
      const httpClient = {
        get: () => m.cold('150ms r', { r: [true] })
      };
      const lookuper = new NominatimValidator(httpClient as unknown as HttpClient);
      const isValid$ = lookuper.validate('Domgasse 5');
      m.expect(isValid$).toBeObservable('150ms t', { t: {} });
    })
  );
});
