import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { pipe, of, from, interval, merge, fromEvent, Observable } from 'rxjs';
import * as GwwActions from '../actions/gww.action';
import { GwwService } from '../../../app/core/services/gww.service';

import { ToastController } from '@ionic/angular';

import * as RouterAction from "../actions/router.action";
import { Router } from "@angular/router";

@Injectable()
export class GwwEffects {
    @Effect()
    getAllPosts$: Observable<Action> = this.actions$
        .ofType(GwwActions.GET_ALL_POSTS)
        .pipe(
            mergeMap(payload =>
                this.gwwService.getAllPosts().pipe(
                    map(data => new GwwActions.GetAllPostsSuccess(data)),
                    catchError(error =>
                        of(new GwwActions.GetAllPostsFail(error))
                    )
                )
            ));

    @Effect({ dispatch: false })
    getAllPostsFail$ = this.actions$
        .ofType(GwwActions.GET_ALL_POSTS_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while loading posts");
            })
        );

    @Effect()
    postComment$: Observable<Action> = this.actions$
        .ofType(GwwActions.POST_COMMENT)
        .pipe(
            map((action: GwwActions.PostComment) => action.payload),
            mergeMap(payload =>
                this.gwwService.postComment(payload.postId,payload.model).pipe(
                    map(data => new GwwActions.PostCommentSuccess(data)),
                    catchError(error =>
                        of(new GwwActions.PostCommentFail(error))
                    )
                )
            ));

    @Effect({ dispatch: false })
    postCommentSuccess$ = this.actions$
        .ofType(GwwActions.POST_COMMENT_SUCCESS)
        .pipe(
            map(payload => {
                this.presentToast("Success");
            })
        );

    @Effect({ dispatch: false })
    postCommentFail$ = this.actions$
        .ofType(GwwActions.POST_COMMENT_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while posting comment");
            })
        );

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }
    constructor(private actions$: Actions, private gwwService: GwwService, private toastController: ToastController, private router: Router) { }

}