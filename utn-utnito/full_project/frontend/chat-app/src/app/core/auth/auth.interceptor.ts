import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authUrls = ['/auth/login', '/auth/refresh-token'];

  private refreshInProgress = false;
  private refreshToken$ = new BehaviorSubject<string | null>(null);

  constructor(private readonly authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const skipAuth = this.authUrls.some((url) => request.url.includes(url));
    const accessToken = this.authService.getAccessToken();

    const authRequest = !skipAuth && accessToken
      ? request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      : request;

    return next.handle(authRequest).pipe(
      catchError((error: unknown) => {
        if (!(error instanceof HttpErrorResponse)) {
          return throwError(() => error);
        }

        if (error.status === 401 && !skipAuth) {
          return this.handle401(authRequest, next);
        }

        if (error.status === 403 && !skipAuth) {
          this.authService.logout();
        }

        return throwError(() => error);
      }),
    );
  }

  private handle401(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const refreshToken = this.authService.getRefreshToken();

    if (!refreshToken) {
      this.authService.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    if (this.refreshInProgress) {
      return this.refreshToken$.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((newAccessToken) => {
          const retryRequest = request.clone({
            setHeaders: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });

          return next.handle(retryRequest);
        }),
      );
    }

    this.refreshInProgress = true;
    this.refreshToken$.next(null);

    return this.authService.refreshToken(refreshToken).pipe(
      switchMap(({ accessToken }) => {
        this.refreshToken$.next(accessToken);

        const retryRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        return next.handle(retryRequest);
      }),
      catchError((refreshError) => {
        this.authService.logout();
        return throwError(() => refreshError);
      }),
      finalize(() => {
        this.refreshInProgress = false;
      }),
    );
  }
}
