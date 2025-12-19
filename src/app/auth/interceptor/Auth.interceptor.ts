import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/Auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  const isLogin =
    req.url.includes('/auth/login') || req.url.endsWith('auth/login');

  console.log('[AuthInterceptor] url:', req.url);
  console.log('[AuthInterceptor] isLogin:', isLogin);

  let request = req;

  if (!isLogin) {
    const headers = this.authService.getAuthorizationHeader();
    console.log('[AuthInterceptor] headers from service:', headers);

    if (headers?.Authorization) {
      request = req.clone({
        setHeaders: { Authorization: headers.Authorization }
      });

      console.log(
        '[AuthInterceptor] Authorization set:',
        request.headers.get('Authorization')?.slice(0, 25) + '...'
      );
    } else {
      console.log('[AuthInterceptor] NO Authorization to set');
    }
  } else {
    console.log('[AuthInterceptor] skipping login request');
  }

  return next.handle(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) this.authService.logout();
      return throwError(() => error);
    })
  );
}


  constructor(private authService: AuthService) {}
}
