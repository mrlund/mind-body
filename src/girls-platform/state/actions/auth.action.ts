
import { Action } from '@ngrx/store';
import { ICourseModule, IPageModel, IPageReference } from '../../interfaces/girls-interfaces';

export const LOGIN_USER = '[AUTH] Login User ';
export const LOGIN_USER_SUCCESS = '[AUTH] Login User Success';
export const LOGIN_USER_FAIL = '[AUTH] Login User Fail';

export const SIGNUP_USER = '[AUTH] Signup User ';
export const SIGNUP_USER_SUCCESS = '[AUTH] Signup User Success';
export const SIGNUP_USER_FAIL = '[AUTH] Signup User Fail';

export const CHECK_USER_AUTHENTICATED = '[AUTH] Check User Authenticated';
export const CHECK_USER_AUTHENTICATED_SUCCESS = '[AUTH] Check User Authenticated Success';
export const CHECK_USER_AUTHENTICATED_FAIL = '[AUTH] Check User Authenticated Fail';

export const LOGOUT_USER = '[AUTH] Logout User';
export const LOGOUT_USER_SUCCESS = '[AUTH] Logout User Success';
export const LOGOUT_USER_FAIL = '[AUTH] Logout User Fail';

export const FORGOT_PASSWORD_REQUEST = '[AUTH] Forgot Password Request';
export const FORGOT_PASSWORD_REQUEST_SUCCESS = '[AUTH] Forgot Password Request Success';
export const FORGOT_PASSWORD_REQUEST_FAIL = '[AUTH] Forgot Password Request Fail';

export class LoginUser implements Action {
    readonly type = LOGIN_USER;
    constructor(public payload: { model: any, returnUrl: string }) { }
}

export class LoginUserSuccess implements Action {
    readonly type = LOGIN_USER_SUCCESS;
    constructor(public payload: { user: any, returnUrl: string }) { }
}

export class LoginUserFail implements Action {
    readonly type = LOGIN_USER_FAIL;
    constructor(public payload: any) { }
}

export class SignupUser implements Action {
    readonly type = SIGNUP_USER;
    constructor(public payload: any) { }
}

export class SignupUserSuccess implements Action {
    readonly type = SIGNUP_USER_SUCCESS;
}

export class SignupUserFail implements Action {
    readonly type = SIGNUP_USER_FAIL;
    constructor(public payload: any) { }
}

export class CheckUserAuthenticated implements Action {
    readonly type = CHECK_USER_AUTHENTICATED;
}
export class CheckUserAuthenticatedSuccess implements Action {
    readonly type = CHECK_USER_AUTHENTICATED_SUCCESS;
}
export class CheckUserAuthenticatedFail implements Action {
    readonly type = CHECK_USER_AUTHENTICATED_FAIL;
}

export class LogoutUser implements Action {
    readonly type = LOGOUT_USER;
}

export class LogoutUserSuccess implements Action {
    readonly type = LOGOUT_USER_SUCCESS;
}

export class LogoutUserFail implements Action {
    readonly type = LOGOUT_USER_FAIL;
}



export class ForgotPasswordRequest implements Action {
    readonly type = FORGOT_PASSWORD_REQUEST;
    constructor(public payload: string) { }
}

export class ForgotPasswordRequestSuccess implements Action {
    readonly type = FORGOT_PASSWORD_REQUEST_SUCCESS;
}

export class ForgotPasswordRequestFail implements Action {
    readonly type = FORGOT_PASSWORD_REQUEST_FAIL;
    constructor(public payload: any) { }
}


export type AuthActions =
    LoginUser
    | LoginUserSuccess
    | LoginUserFail
    | SignupUser
    | SignupUserSuccess
    | SignupUserFail
    | CheckUserAuthenticated
    | CheckUserAuthenticatedSuccess
    | CheckUserAuthenticatedFail
    | LogoutUser
    | LogoutUserSuccess
    | LogoutUserFail
    | ForgotPasswordRequest
    | ForgotPasswordRequestSuccess
    | ForgotPasswordRequestFail;