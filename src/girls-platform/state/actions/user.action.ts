
import { Action } from '@ngrx/store';

export const UPDATE_USER_INFO = '[USER] Update User Info';
export const UPDATE_USER_INFO_SUCCESS = '[USER] Update User Info Success';
export const UPDATE_USER_INFO_FAIL = '[USER] Update User Info Fail';


export const GET_USER_INFO = '[USER] Get User Info';
export const GET_USER_INFO_SUCCESS = '[USER] Get User Info Success';
export const GET_USER_INFO_FAIL = '[USER] Get User Info Fail';


export class UpdateUserInfo implements Action {
    readonly type = UPDATE_USER_INFO;
    constructor(public payload: any) { }
}

export class UpdateUserInfoSuccess implements Action {
    readonly type = UPDATE_USER_INFO_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateUserInfoFail implements Action {
    readonly type = UPDATE_USER_INFO_FAIL;
    constructor(public payload: any) { }
}

export class GetUserInfo implements Action {
    readonly type = GET_USER_INFO;
}

export class GetUserInfoSuccess implements Action {
    readonly type = GET_USER_INFO_SUCCESS;
    constructor(public payload: any) { }
}

export class GetUserInfoFail implements Action {
    readonly type = GET_USER_INFO_FAIL;
    constructor(public payload: any) { }
}


export type UserActions =
    UpdateUserInfo
    | UpdateUserInfoSuccess
    | UpdateUserInfoFail
    | GetUserInfo
    | GetUserInfoSuccess
    | GetUserInfoFail;