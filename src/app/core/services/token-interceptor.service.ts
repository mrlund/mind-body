import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { AuthService } from "./auth.service";

import { Store } from "@ngrx/store";
import * as fromRoot from "@platform/state";
import { environment } from "@env/environment";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector,
    private toastController: ToastController,
    private store: Store<fromRoot.State>) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const authService = this.injector.get(AuthService);

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    currentUser=JSON.parse(currentUser);
    if (!request.url.startsWith('/assets')) {
      if (request.url == "/user/login" || request.url == "/user/register") {
        request = request.clone({
          url: `${environment.apiUrl}/api${request.url}`
        });
      }
      else {

        request = request.clone({
          url: `${environment.apiUrl}/api${request.url}`,
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
    }
    return next.handle(request).pipe(
      tap((ev: any) => {
        if (ev instanceof HttpResponse) {
        }
      }),
      catchError((response: any) => {
        if (response instanceof HttpErrorResponse) {
          try {
            if (!navigator.onLine) {
              console.log("You are offline")
            } else if (response.status === 401) {
              const message = "You are not authorized";
              console.log(message);
              const router = this.injector.get(Router);
              router.navigate(["/login"]);
              return throwError({ error: response, message: message });
            } else if (response.status === 403) {
              const message = "You don't have permission for this operation";
              console.log(message);
              return throwError({ error: response, message: message });
            } else if (response.status === 404) {
              const message = "Requested resource not found";
              console.log(message);
              return throwError({ error: response, message: message });
            } else if (response.error.error == "invalid_grant") {
              const message = "Username/Password is wrong";
              return throwError({ error: response, message: message });
            } else {
              let message = response.error.message || "Server error";
              return throwError({ error: response, message: message });
            }
          } catch (ex) {
            let message = response.error.message || "Server error";
            return throwError({ error: response, message: message });
          }
        } else {
          //Client Error
        }
        //  return _throw(response);
      })
    );

  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
