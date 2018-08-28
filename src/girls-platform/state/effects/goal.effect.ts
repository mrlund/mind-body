import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { pipe, of, from, interval, merge, fromEvent, Observable } from 'rxjs';
import * as GoalActions from '../actions/goal.action';
import { GoalService } from '@app/core/services/goal.service';
import { ToastController } from '@ionic/angular';
import * as RouterAction from "../actions/router.action";
import { Router } from "@angular/router";

@Injectable()
export class GoalEffects {

    @Effect()
    getAllGoals$: Observable<Action> = this.actions$
        .ofType(GoalActions.GET_ALL_GOALS)
        .pipe(
            map((action: GoalActions.GetAllGoals) => action.payload),
            mergeMap(payload =>
                this.goalService.getAllGoals(payload).pipe(
                    map(data => new GoalActions.GetAllGoalsSuccess(data)),
                    catchError(error =>
                        of(new GoalActions.GetAllGoalsFail(error))
                    )
                )
            ));

    @Effect({ dispatch: false })
    getAllPostsFail$ = this.actions$
        .ofType(GoalActions.GET_ALL_GOALS_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while loading goals");
            })
        );
    @Effect()
    postGoal$: Observable<Action> = this.actions$
        .ofType(GoalActions.POST_GOAL)
        .pipe(
            map((action: GoalActions.PostGoal) => action.payload),
            mergeMap(payload =>
                this.goalService.postGoal(payload).pipe(
                    map(data => new GoalActions.PostGoalSuccess(data)),
                    catchError(error =>
                        of(new GoalActions.PostGoalFail(error))
                    )
                )
            ));

    @Effect({ dispatch: false })
    postGoalSuccess$ = this.actions$
        .ofType(GoalActions.POST_GOAL_SUCCESS)
        .pipe(
            map(payload =>
                this.presentToast("Goal submitted successfully."),
            )
        );
    @Effect({ dispatch: false })
    postGoalFail$ = this.actions$
        .ofType(GoalActions.POST_GOAL_FAIL)
        .pipe(
            map(payload => {
                this.presentToast("Sorry,an error occured while submitting goal");
            })
        );

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000
        });
        toast.present();
    }
    constructor(private actions$: Actions, private goalService: GoalService, private toastController: ToastController, private router: Router) { }

}