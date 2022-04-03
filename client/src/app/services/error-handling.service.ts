import { HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService implements HttpInterceptor {
  public currentError = undefined;

  constructor() {
    // empty
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          default:
            this.handleError(error);
            return throwError(error);
        }
      })
    );
  }

  public handleError(error) {
    this.currentError = error;
    return this.currentError;
  }

}
