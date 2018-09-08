import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

import { switchMap, map, catchError } from "rxjs/operators";
import { ReplaySubject, Observable, of, throwError } from "rxjs";

import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated = false;

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtService) { }
  login(model: any) {
    return this.http.post<any>(`/user/login`, model).pipe(
      map((user: any) => {
        if (user && user.Token) {
          this.jwtService.saveToken(JSON.stringify(user));
          this.isAuthenticatedSubject.next(true);
          this._authenticated = true;
        }
        return user;
      })
    ).pipe(catchError(this.handleError));
  }
  externalProviderWindow = null;
  loginWithGoogle() {
    //window.location.href="https://www.google.com/api/user/externallogins?returnUrl=https://mind-body.azurewebsites.net/&provider=Google";

    return this.http.get('/user/externallogins?returnUrl=https://mind-body.azurewebsites.net/&provider=Google')
      .subscribe((user) => {
        console.log(user);
        debugger;
      }, (error) => {
        console.log(error);
      }
      );
    // return this.http.get('/user/externallogins?returnUrl=https://mind-body.azurewebsites.net/&provider=Google')
    //   .pipe(
    //     map((user: any) => {
    //       console.log(user);
    //       debugger;
    //     })
    //   ).pipe(catchError(this.handleError));
  }
  logout() {
    this.jwtService.destroyToken();
    this._authenticated = false;
    this.isAuthenticatedSubject.next(false);
    return of(true);
  }

  authenticated(): Observable<boolean> {
    var token = this.jwtService.getToken();
    if (!token) {
      return of(false);
    }
    return of(true);
  }

  isUserAuthenticated(): boolean {
    var token = this.jwtService.getToken();
    if (!token) {
      return false;
    }
    return true;
  }

  getToken() {
    return this.jwtService.getToken();
  }

  registerUser(model: any) {
    return this.http
      .post<any>(`/user/register`, model)
      .pipe(
        map((user: any) => {
          if (user && user.Token) {
            this.jwtService.saveToken(JSON.stringify(user));
          }
          return user;
        })
      ).pipe(catchError(this.handleError));
  }

  forgotPassword(model: any) {
    return this.http.post<any>(
      `/user/forgotpassword`,
      model
    ).pipe(catchError(this.handleError));
  }
  private handleError(error: any) {
    if (error.error.status == 401) {
      return throwError(error);
    }
    if (error.error) {
      return throwError(error.error);
    }
    let errMsg = error.error.message || "Server error";
    return throwError(errMsg);
  }

}
