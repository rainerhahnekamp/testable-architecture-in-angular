import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './+state/shared.reducer';

const anonymousUser: User = {
  id: 1,
  email: '',
  firstname: '',
  name: '',
  anonymous: true
};

@Injectable()
export class MockedSecurityInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.endsWith('/security/user-info')) {
      return of(new HttpResponse({ body: anonymousUser, status: 200 }));
    }

    return next.handle(req);
  }
}
