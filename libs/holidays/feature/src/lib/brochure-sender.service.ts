import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Holiday } from '@eternal/holidays/model';

@Injectable({ providedIn: 'root' })
export class BrochureSender {
  constructor(private httpClient: HttpClient) {}

  send(address: string, holiday: Holiday) {
    return this.httpClient.post('/holidays/send-brochure', {
      address,
      holidayId: holiday.id
    });
  }
}
