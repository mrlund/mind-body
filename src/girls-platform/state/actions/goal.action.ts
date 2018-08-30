
import { Action } from '@ngrx/store';

export const GET_ALL_GOALS = '[MOOD] Get All Goals';
export const GET_ALL_GOALS_SUCCESS = '[MOOD] Get All Goals Success';
export const GET_ALL_GOALS_FAIL = '[MOOD] Get All Goals Fail';


export const POST_GOAL = '[MOOD] Post Goal';
export const POST_GOAL_SUCCESS = '[MOOD] Post Goal Success';
export const POST_GOAL_FAIL = '[MOOD] Post Goal Fail';

export const POST_GOAL_PROGRESS = '[MOOD] Post Goal Progress';
export const POST_GOAL_PROGRESS_SUCCESS = '[MOOD] Post Goal Progress Success';
export const POST_GOAL_PROGRESS_FAIL = '[MOOD] Post Goal Progress Fail';

export const RESET_GOAL_FORM = '[MOOD] Reset Goal Form';


export class GetAllGoals implements Action {
    readonly type = GET_ALL_GOALS;
    constructor(public payload: number) { }
}

export class GetAllGoalsSuccess implements Action {
    readonly type = GET_ALL_GOALS_SUCCESS;
    constructor(public payload: any[]) { }
}

export class GetAllGoalsFail implements Action {
    readonly type = GET_ALL_GOALS_FAIL;
    constructor(public payload: any) { }
}

export class PostGoal implements Action {
    readonly type = POST_GOAL;
    constructor(public payload: any) { }
}

export class PostGoalSuccess implements Action {
    readonly type = POST_GOAL_SUCCESS;
    constructor(public payload: any) { }
}

export class PostGoalFail implements Action {
    readonly type = POST_GOAL_FAIL;
    constructor(public payload: any) { }
}


export class PostGoalProgress implements Action {
    readonly type = POST_GOAL_PROGRESS;
    constructor(public payload: any) { }
}

export class PostGoalProgressSuccess implements Action {
    readonly type = POST_GOAL_PROGRESS_SUCCESS;
    constructor(public payload: any) { }
}

export class PostGoalProgressFail implements Action {
    readonly type = POST_GOAL_PROGRESS_FAIL;
    constructor(public payload: any) { }
}

export class ResetGoalForm implements Action {
    readonly type = RESET_GOAL_FORM;
}

export type GoalActions =
    | PostGoal
    | PostGoalSuccess
    | PostGoalFail
    | PostGoalProgress
    | PostGoalProgressSuccess
    | PostGoalProgressFail
    | GetAllGoals
    | GetAllGoalsFail
    | GetAllGoalsSuccess
    | ResetGoalForm;