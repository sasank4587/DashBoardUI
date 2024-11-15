import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';
import { MsalService } from '@azure/msal-angular';
import { switchMap, catchError, retry } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: MsalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(
      this.authService.acquireTokenSilent({ scopes: ['api://fa4ba82e-3538-42b7-9ed5-8a9aa18d8f49/user.read'] })
    ).pipe(
      switchMap((tokenResponse: any) => {
        const token = tokenResponse.accessToken;
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(authReq);
      }),
      catchError((error) => {
        console.error('Token acquisition failed:', error);
        // Retry or handle the error as needed
        return next.handle(req); // Continue without token if desired
      })
    );
  }
}
