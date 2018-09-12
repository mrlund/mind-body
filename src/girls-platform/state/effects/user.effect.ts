import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, switchMap, map, catchError } from 'rxjs/operators';
import { pipe, of, from, interval, merge, fromEvent, Observable } from 'rxjs';
import * as UserActions from '../actions/user.action';
import { UserService } from '@app/core/services/user.service';
import { ToastController } from '@ionic/angular';
import * as RouterAction from "../actions/router.action";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {

    @Effect()
    updateUserInfo$: Observable<Action> = this.actions$
        .ofType(UserActions.UPDATE_USER_INFO)
        .pipe(
            map((action: UserActions.UpdateUserInfo) => action.payload),
            mergeMap(payload =>
                this.userService.updateProfile(payload).pipe(
                    map(data => new UserActions.UpdateUserInfoSuccess(data)),
                    catchError(error =>
                        of(new UserActions.UpdateUserInfoFail(error))
                    )
                )
            ));

    @Effect({ dispatch: false })
    updateUserInfoSuccess$ = this.actions$
        .ofType(UserActions.UPDATE_USER_INFO_SUCCESS)
        .pipe(
            map(payload => {
                this.presentToast("Profile Updated Successfully");
            })
        );

    @Effect({ dispatch: false })
    updateUserInfoFail$ = this.actions$
        .ofType(UserActions.UPDATE_USER_INFO_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while updating user");
            })
        );

    @Effect()
    uploadUserImage$: Observable<Action> = this.actions$
        .ofType(UserActions.UPLOAD_PROFILE_IMAGE)
        .pipe(
            map((action: UserActions.UploadProfileImage) => action.payload),
            mergeMap(payload =>
                this.userService.uploadProfileImage(payload).pipe(
                    map(data => new UserActions.UploadProfileImageSuccess(data)),
                    catchError(error =>
                        of(new UserActions.UploadProfileImageFail(error))
                    )
                )
            ));

    @Effect({ dispatch: false })
    uploadUserImageSuccess$ = this.actions$
        .ofType(UserActions.UPLOAD_PROFILE_IMAGE_SUCCESS)
        .pipe(
            map(payload => {
                this.presentToast("Profile Image uploaded sccessfully");
            })
        );

    @Effect({ dispatch: false })
    uploadUserImageFail$ = this.actions$
        .ofType(UserActions.UPLOAD_PROFILE_IMAGE_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while uploading image");
            })
        );

    @Effect()
    getUserInfo$: Observable<Action> = this.actions$
        .ofType(UserActions.GET_USER_INFO)
        .pipe(
            switchMap(payload =>
                this.userService.getUserProfile().pipe(
                    map(data => new UserActions.GetUserInfoSuccess(data)),
                    catchError(error =>
                        of(new UserActions.GetUserInfoFail(error))
                    )
                )
            ));

    // @Effect({ dispatch: false })
    // getUserInfoSuccess$ = this.actions$
    //     .ofType(UserActions.GET_USER_INFO_SUCCESS)
    //     .pipe(
    //         map(payload => {
    //             this.presentToast("Profile Updated Successfully");
    //         })
    //     );

    @Effect({ dispatch: false })
    getUserInfoFail$ = this.actions$
        .ofType(UserActions.GET_USER_INFO_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while loading user info");
            })
        );
    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }
    
    constructor(private actions$: Actions, private userService: UserService, private toastController: ToastController, private router: Router) { }

}