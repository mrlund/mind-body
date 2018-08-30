import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, switchMap, catchError } from 'rxjs/operators';
import { pipe, of, from, interval, merge, fromEvent, Observable } from 'rxjs';

import { ICourseModule, CourseContentProvider } from '../../interfaces/girls-interfaces';
import * as AuthActions from '../actions/auth.action';
import { AuthService } from '../../../app/core/services/auth.service';

import { ToastController } from '@ionic/angular';

import * as RouterAction from "../actions/router.action";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
    @Effect()
    login$: Observable<Action> = this.actions$
        .ofType(AuthActions.LOGIN_USER)
        .pipe(
            map((action: AuthActions.LoginUser) => action.payload),
            switchMap(payload => {
                return this.authService
                    .login(payload.model)
                    .pipe(
                        map(user => new AuthActions.LoginUserSuccess({ user: user, returnUrl: payload.returnUrl })),
                        catchError(error =>
                            of(new AuthActions.LoginUserFail(error))
                        )
                    );
            })
        );
    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$
        .ofType(AuthActions.LOGIN_USER_SUCCESS)
        .pipe(
            map((action: AuthActions.LoginUser) => action.payload),
            mergeMap(payload => {
                return [
                    this.presentToast("Login Success"),
                    this.router.navigateByUrl(payload.returnUrl)
                ]
            })
        );
    @Effect({ dispatch: false })
    loginFail$ = this.actions$
        .ofType(AuthActions.LOGIN_USER_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while login");
            })
        );


    // @Effect()
    // loginWithGoogle$: Observable<Action> = this.actions$
    //     .ofType(AuthActions.LOGIN_WITH_GOOGLE)
    //     .pipe(
    //         switchMap(payload => {
    //             return this.authService
    //                 .loginWithGoogle()
    //                 .pipe(
    //                     map(user => new AuthActions.LoginWithGoogleSuccess({ user: user, returnUrl: "" })),
    //                     catchError(error =>
    //                         of(new AuthActions.LoginWithGoogleFail(error))
    //                     )
    //                 );
    //         })
    //     );
    @Effect({ dispatch: false })
    loginWithGoogleSuccess$ = this.actions$
        .ofType(AuthActions.LOGIN_WITH_GOOGLE_SUCCESS)
        .pipe(
            map((action: AuthActions.LoginWithGoogleSuccess) => action.payload),
            mergeMap(payload => {
                return [
                    this.presentToast("Login Success"),
                    this.router.navigateByUrl(payload.returnUrl)
                ]
            })
        );
    @Effect({ dispatch: false })
    loginWithGoogleFail$ = this.actions$
        .ofType(AuthActions.LOGIN_WITH_GOOGLE_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while login");
            })
        );

    @Effect()
    checkUserAuthenticated$: Observable<Action> = this.actions$
        .ofType(AuthActions.CHECK_USER_AUTHENTICATED)
        .pipe(
            switchMap(payload => {
                return this.authService
                    .authenticated()
                    .pipe(
                        map(status => {
                            if (status) {
                                return new AuthActions.CheckUserAuthenticatedSuccess();
                            }
                            else {
                                return new AuthActions.CheckUserAuthenticatedFail();
                            }
                        }),
                        catchError(error =>
                            of(new AuthActions.CheckUserAuthenticatedFail())
                        )
                    );
            })
        );
    @Effect()
    logout$: Observable<Action> = this.actions$
        .ofType(AuthActions.LOGOUT_USER)
        .pipe(
            switchMap(payload => {
                return this.authService
                    .logout()
                    .pipe(
                        map(user => new AuthActions.LogoutUserSuccess()),
                        catchError(error =>
                            of(new AuthActions.LogoutUserFail())
                        )
                    );
            })
        );
    @Effect({ dispatch: false })
    logoutSuccess$ = this.actions$
        .ofType(AuthActions.LOGOUT_USER_SUCCESS)
        .pipe(
            map(payload => {
                this.router.navigateByUrl('/login');
            })
        );
    @Effect()
    signup$: Observable<Action> = this.actions$
        .ofType(AuthActions.SIGNUP_USER)
        .pipe(
            map((action: AuthActions.SignupUser) => action.payload),
            switchMap(payload => {
                return this.authService
                    .registerUser(payload)
                    .pipe(
                        map(user => new AuthActions.SignupUserSuccess()),
                        catchError(error =>
                            of(new AuthActions.SignupUserFail(error))
                        )
                    );
            })
        );

    @Effect({ dispatch: false })
    signupSuccess$ = this.actions$
        .ofType(AuthActions.SIGNUP_USER_SUCCESS)
        .pipe(
            mergeMap(payload => {
                return [
                    this.presentToast("Signup Success"),
                    this.router.navigateByUrl('/home')
                ]
            })
        );
    @Effect({ dispatch: false })
    signupFail$ = this.actions$
        .ofType(AuthActions.SIGNUP_USER_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while signing up an user");
            })
        );

    @Effect()
    forgotPassword$: Observable<Action> = this.actions$
        .ofType(AuthActions.FORGOT_PASSWORD_REQUEST)
        .pipe(
            map((action: AuthActions.ForgotPasswordRequest) => action.payload),
            switchMap(payload => {
                return this.authService
                    .forgotPassword(payload)
                    .pipe(
                        map(user => new AuthActions.ForgotPasswordRequestSuccess()),
                        catchError(error =>
                            of(new AuthActions.ForgotPasswordRequestFail(error))
                        )
                    );
            })
        );

    @Effect({ dispatch: false })
    forgotPasswordSuccess$ = this.actions$
        .ofType(AuthActions.FORGOT_PASSWORD_REQUEST_SUCCESS)
        .pipe(
            mergeMap(payload => {
                return [
                    this.presentToast("Password reset link sent successfully to your email address"),
                    this.router.navigateByUrl('/login')]
            })
        );
    @Effect({ dispatch: false })
    forgotPasswordFail$ = this.actions$
        .ofType(AuthActions.FORGOT_PASSWORD_REQUEST_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while sending password reset link");
            })
        );

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }
    constructor(private actions$: Actions, private authService: AuthService, private toastController: ToastController, private router: Router) { }
}