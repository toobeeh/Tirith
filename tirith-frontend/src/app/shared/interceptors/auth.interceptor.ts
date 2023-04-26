import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem("AUTH_BEARER");
    if (token == null) return next.handle(request);

    const clone = request.clone({
      setHeaders: {
        "Authorization": `Bearer ${token}`
      }
    })
    return next.handle(clone);
  }
}
