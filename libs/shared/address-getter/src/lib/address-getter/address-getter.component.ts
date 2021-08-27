import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NominatimValidator } from '../nominatim-validator.service';
import { validateAddress } from '../validate-address';

@Component({
  selector: 'eternal-address-getter',
  templateUrl: './address-getter.component.html',
  styleUrls: ['./address-getter.component.scss']
})
export class AddressGetterComponent {
  @Output() done = new EventEmitter<{ address: string; isValid: boolean }>();

  formGroup: FormGroup = this.formBuilder.group({
    address: [
      '',
      {
        validators: [Validators.required, ({ value }: AbstractControl) => validateAddress(value)],
        asyncValidators: (ac: AbstractControl) => this.nominatimValidator.validate(ac.value)
      }
    ]
  });

  constructor(private formBuilder: FormBuilder, private nominatimValidator: NominatimValidator) {}

  handleSubmit() {
    if (this.formGroup.valid) {
      this.done.emit({ address: this.formGroup.value.address, isValid: true });
    }
  }

  handleCancel() {
    this.done.emit({ address: '', isValid: false });
  }
}
