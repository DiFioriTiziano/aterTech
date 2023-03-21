import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './service/auth/auth.service';
import { stringify } from 'querystring';

@Injectable()
export class TokenApiInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

      intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = localStorage.getItem('id_token')

        const authReq = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${token}`)
        });

        // Pass the cloned request to the next handler
        return next.handle(authReq).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              // Unauthorized error
              return this.authService.refreshToken().pipe(
                switchMap(() => {
                  let newtoken = localStorage.getItem('id_token')
                  let refreshToken = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${newtoken}`)
                  });
                  return next.handle(refreshToken);
                }),
                catchError((error) => {
                  this.authService.logout();
                  return throwError(error);
                })
              );
            } else {
              return throwError(error);
            }
          })
        );

      }


  }
