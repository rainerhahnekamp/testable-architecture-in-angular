import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de-AT';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormlyModule } from '@ngx-formly/core';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { CoreModule } from './core/core.module';
import { LoadingInterceptor } from './core/loading.interceptor';
import { MockedSecurityInterceptor } from './shared/mocked-security.intercetpor';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeDe, 'de-AT');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MatSidenavModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    SharedModule,
    FormlyModule.forRoot({
      extras: { lazyRender: true },
      validationMessages: [
        {
          name: 'required',
          message: 'This field is mandatory'
        }
      ]
    })
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'de-AT'
    },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: LoadingInterceptor },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: MockedSecurityInterceptor
    },
    { provide: LOCALE_ID, useValue: 'de-AT' },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
