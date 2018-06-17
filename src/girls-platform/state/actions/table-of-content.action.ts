
import { Action } from '@ngrx/store';
import { ICourseModule, IPageModel, IPageReference } from '../../interfaces/girls-interfaces';

export const GET_TABLE_OF_CONTENT = '[GIRLS] GET_TABLE_OF_CONTENT';
export const GET_TABLE_OF_CONTENT_SUCCESS = '[GIRLS] GET_TABLE_OF_CONTENT_SUCCESS';

export class GetTableOfContent implements Action {
    readonly type = GET_TABLE_OF_CONTENT;
}

export class GetTableOfContentSuccess implements Action {
    readonly type = GET_TABLE_OF_CONTENT_SUCCESS;
    constructor(public payload: ICourseModule[]) { }
}



export type TableOfContentActions = GetTableOfContent | GetTableOfContentSuccess;