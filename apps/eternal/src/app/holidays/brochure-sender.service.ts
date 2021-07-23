import { Injectable } from '@angular/core';
import { Holiday } from './holiday';

@Injectable({ providedIn: 'root' })
export class BrochureSender {
  send(email: string, holiday: Holiday) {
    console.info(`sending brochure for ${holiday.title} to ${email}`);
  }
}
