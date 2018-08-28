
import { Action } from '@ngrx/store';
import { ICourse, IPageModel, IPageReference } from '../../interfaces/girls-interfaces';

export const POST_MOOD = '[MOOD] Post Mood';
export const POST_MOOD_SUCCESS = '[MOOD] Post Mood Success';
export const POST_MOOD_FAIL = '[MOOD] Post Mood Fail';

export class PostMood implements Action {
    readonly type = POST_MOOD;
    constructor(public payload: any) { }
}

export class PostMoodSuccess implements Action {
    readonly type = POST_MOOD_SUCCESS;
    constructor(public payload: any) { }
}

export class PostMoodFail implements Action {
    readonly type = POST_MOOD_FAIL;
    constructor(public payload: any) { }
}

export type MoodActions =
    PostMood |
    PostMoodFail |
    PostMoodSuccess;