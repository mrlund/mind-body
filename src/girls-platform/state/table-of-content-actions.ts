import {Injectable} from '@angular/core';  
import {Action} from '@ngrx/store';
import { ICourseModule, IPageModel, IPageReference } from '../interfaces/girls-interfaces';

export const GET_TABLE_OF_CONTENT = 'GET_TABLE_OF_CONTENT';
export const GET_TABLE_OF_CONTENT_SUCCESS = 'GET_TABLE_OF_CONTENT_SUCCESS';

export class getTableOfContent implements Action {
    readonly type = GET_TABLE_OF_CONTENT;
}

export class getTableOfContentSuccess implements Action {
    readonly type = GET_TABLE_OF_CONTENT_SUCCESS;
    constructor(public payload: ICourseModule[]){}
}



export type Actions = getTableOfContent | getTableOfContentSuccess ;