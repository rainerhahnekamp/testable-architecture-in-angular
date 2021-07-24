import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Holiday } from './holiday';

@Injectable({ providedIn: 'root' })
export class BrochureSender {
  send(address: string, holiday: Holiday) {
    console.info(`sending brochure for ${holiday.title} to ${address}`);
    return of();
  }
}
