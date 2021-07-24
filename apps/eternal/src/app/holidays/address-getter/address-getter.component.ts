import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NominatimValidator } from '../nominatim-validator.service';
import { validateAddress } from '../validate-address';

@Component({
  templateUrl: './address-getter.component.html'
})
export class AddressGetterComponent {
  formGroup: FormGroup = this.formBuilder.group({
    address: [
      '',
      {
        validators: [Validators.required, ({ value }: AbstractControl) => validateAddress(value)],
        asyncValidators: (ac: AbstractControl) => this.nominatimValidator.validate(ac.value)
      }
    ]
  });

  constructor(
    private formBuilder: FormBuilder,
    private nominatimValidator: NominatimValidator,
    private matDialog: MatDialogRef<AddressGetterComponent>
  ) {}

  handleSubmit() {
    this.matDialog.close(this.formGroup.value.address);
  }
}
