
import { Action } from '@ngrx/store';

export const UPDATE_USER_INFO = '[USER] Update User Info';
export const UPDATE_USER_INFO_SUCCESS = '[USER] Update User Info Success';
export const UPDATE_USER_INFO_FAIL = '[USER] Update User Info Fail';

export const UPLOAD_PROFILE_IMAGE = '[USER] Upload Profile Image';
export const UPLOAD_PROFILE_IMAGE_SUCCESS = '[USER] Upload Profile Image Success';
export const UPLOAD_PROFILE_IMAGE_FAIL = '[USER] Upload Profile Image Fail';

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

export class UploadProfileImage implements Action {
    readonly type = UPLOAD_PROFILE_IMAGE;
    constructor(public payload: any) { }
}

export class UploadProfileImageSuccess implements Action {
    readonly type = UPLOAD_PROFILE_IMAGE_SUCCESS;
    constructor(public payload: any) { }
}

export class UploadProfileImageFail implements Action {
    readonly type = UPLOAD_PROFILE_IMAGE_FAIL;
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
    | GetUserInfoFail
    | UploadProfileImage
    | UploadProfileImageSuccess
    | UploadProfileImageFail;