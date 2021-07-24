import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NominatimValidator {
  constructor(private httpClient: HttpClient) {}

  validate(query: string): Observable<ValidationErrors> {
    return of(true).pipe(
      delay(250),
      switchMap(() =>
        this.httpClient
          .get<string[]>('https://nominatim.openstreetmap.org/search.php', {
            params: new HttpParams().set('format', 'jsonv2').set('q', query)
          })
          .pipe(
            map((addresses) => (addresses.length > 0 ? {} : { nominatim: 'invalid address' })),
            catchError(() => of({ nominatim: 'http error' }))
          )
      )
    );
  }
}
