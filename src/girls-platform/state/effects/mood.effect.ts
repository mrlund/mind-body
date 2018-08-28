import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { pipe, of, from, interval, merge, fromEvent, Observable } from 'rxjs';
import * as MoodActions from '../actions/mood.action';
import { MoodService } from '../../../app/core/services/mood.service';

import { ToastController } from '@ionic/angular';

import * as RouterAction from "../actions/router.action";
import { Router } from "@angular/router";

@Injectable()
export class MoodEffects {
    @Effect()
    postMood$: Observable<Action> = this.actions$
        .ofType(MoodActions.POST_MOOD)
        .pipe(
            map((action: MoodActions.PostMood) => action.payload),
            mergeMap(payload =>
                this.moodService.postMood(payload).pipe(
                    map(data => new MoodActions.PostMoodSuccess(data)),
                    catchError(error =>
                        of(new MoodActions.PostMoodFail(error))
                    )
                )
            ));

    @Effect({ dispatch: false })
    postMoodSuccess$ = this.actions$
        .ofType(MoodActions.POST_MOOD_SUCCESS)
        .pipe(
            mergeMap(payload => {
                return [
                    this.presentToast("Post submitted successfully."),
                    this.router.navigateByUrl('/home')]
            })
        );
    @Effect({ dispatch: false })
    postMoodFail$ = this.actions$
        .ofType(MoodActions.POST_MOOD_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while submitting post");
            })
        );

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }
    constructor(private actions$: Actions, private moodService: MoodService, private toastController: ToastController, private router: Router) { }

}