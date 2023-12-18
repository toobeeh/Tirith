import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user-session.service';

/**
 * @deprecated
 * Authorization is added in API configuration instead.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = UserService.getToken();
    if (token == null) return next.handle(request);

    const clone = request.clone({
      setHeaders: {
        "Authorization": `Bearer ${token}`
      }
    })
    return next.handle(clone);
  }
}
