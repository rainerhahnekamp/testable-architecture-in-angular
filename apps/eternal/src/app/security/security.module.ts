import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    FormlyModule.forChild(),
    FormlyMaterialModule,
    RouterModule.forChild([
      {
        path: '',
        children: [{ path: 'sign-in', component: SignInComponent }]
      }
    ]),
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    MatDatepickerModule,
    MatRippleModule,
    FormlyMatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ]
})
export class SecurityModule {}
