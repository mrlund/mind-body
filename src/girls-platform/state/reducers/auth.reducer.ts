import { ActionReducer, Action } from '@ngrx/store';
import * as fromAuthAction from "../actions/auth.action";
import * as fromAuth from "../actions/auth.action";

export interface AuthState {
    loginUserLoading: boolean;
    loginUserComplete: boolean;
    loginUserError: any;
    loggedinUser: any;
    signupUserLoading: boolean;
    signupUserComplete: boolean;
    signupUserError: any;
    isUserAuthenticated: boolean;
    forgotPasswordLoading: boolean;
    forgotPasswordComplete: boolean;
    forgotPasswordError: any;
    classRoomMode: boolean;
}

export const initialState: AuthState = {
    loginUserLoading: false,
    loginUserComplete: false,
    loginUserError: null,
    loggedinUser: null,
    signupUserLoading: false,
    signupUserComplete: false,
    signupUserError: null,
    isUserAuthenticated: false,
    forgotPasswordLoading: false,
    forgotPasswordComplete: false,
    forgotPasswordError: null,
    classRoomMode: true
};

export function reducer(
    state: any = initialState,
    action: fromAuth.AuthActions
): AuthState {
    switch (action.type) {
        case fromAuthAction.LOGIN_USER: {
            return {
                ...state,
                loginUserLoading: true
            };
        }
        case fromAuthAction.LOGIN_USER_SUCCESS: {
            return {
                ...state,
                loginUserLoading: false,
                loginUserComplete: true,
                loggedinUser: action.payload,
                isUserAuthenticated: true
            };
        }

        case fromAuthAction.LOGIN_USER_FAIL: {
            return {
                ...state,
                loginUserLoading: false,
                loginUserError: action.payload
            };
        }

        case fromAuthAction.SIGNUP_USER: {
            return {
                ...state,
                signupUserLoading: true
            };
        }
        case fromAuthAction.SIGNUP_USER_SUCCESS: {
            return {
                ...state,
                signupUserLoading: false,
                signupUserComplete: true,
                isUserAuthenticated: true
            };
        }

        case fromAuthAction.SIGNUP_USER_FAIL: {
            return {
                ...state,
                signupUserLoading: false,
                signupUserError: action.payload
            };
        }

        case fromAuthAction.CHECK_USER_AUTHENTICATED_SUCCESS: {
            return {
                ...state,
                isUserAuthenticated: true
            };
        }
        case fromAuthAction.CHECK_USER_AUTHENTICATED_FAIL: {
            return {
                ...state,
                isUserAuthenticated: false
            };
        }

        case fromAuthAction.FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordLoading: true
            };
        }

        case fromAuthAction.FORGOT_PASSWORD_REQUEST_SUCCESS: {
            return {
                ...state,
                forgotPasswordLoading: false,
                forgotPasswordComplete: true
            };
        }
        case fromAuthAction.FORGOT_PASSWORD_REQUEST_FAIL: {
            return {
                ...state,
                forgotPasswordLoading: false,
                forgotPasswordComplete: false,
                forgotPasswordError: action.payload
            };
        }

        case fromAuthAction.SET_CLASSROOM_MODE: {
            return {
                ...state,
                classRoomMode: action.payload
            };
        }

        default:
            return state;
    }
}

export const getLoginUserLoading = (state: AuthState) => state.loginUserLoading;
export const getLoginUserComplete = (state: AuthState) => state.loginUserComplete;
export const getLoginUserError = (state: AuthState) => state.loginUserError;
export const getLoggedinUser = (state: AuthState) => state.loggedinUser;


export const getSignupUserLoading = (state: AuthState) => state.signupUserLoading;
export const getSignupUserComplete = (state: AuthState) => state.signupUserComplete;
export const getSignupUserError = (state: AuthState) => state.signupUserError;

export const getUserAuthenticated = (state: AuthState) => state.isUserAuthenticated;


export const getForgotPasswordLoading = (state: AuthState) => state.forgotPasswordLoading;
export const getForgotPasswordComplete = (state: AuthState) => state.forgotPasswordComplete;
export const getForgotPasswordError = (state: AuthState) => state.forgotPasswordError;

export const getClassRoomMode = (state: AuthState) => state.classRoomMode;


