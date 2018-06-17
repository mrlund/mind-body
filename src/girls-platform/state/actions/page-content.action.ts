
import { Action } from '@ngrx/store';
import { ICourseModule, IPageModel, IPageReference } from '../../interfaces/girls-interfaces';

export const GET_NEXT_AND_PREV_PAGE = '[GIRLS] Get Next And Previous Page';
export const GET_NEXT_AND_PREV_PAGE_SUCCESS = '[GIRLS] Get Next And Previous Page Success';

export class GetNextAndPrevPage implements Action {
    readonly type = GET_NEXT_AND_PREV_PAGE;
    constructor(public payload: IPageReference) { }
}

export class GetNextAndPrevPageSuccess implements Action {
    readonly type = GET_NEXT_AND_PREV_PAGE_SUCCESS;
    constructor(public payload: IPageModel) { }
}

export type PageContentActions = GetNextAndPrevPage | GetNextAndPrevPageSuccess;