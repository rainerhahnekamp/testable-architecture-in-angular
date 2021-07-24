import { ValidationErrors } from '@angular/forms';

export function validateAddress(value: string): ValidationErrors {
  if (!value) {
    return {};
  }

  return value.match(/^([\w\s]+)\s(\d+),\s(\d+)\s([\w\s]+)$/) ? {} : { address: true };
}
