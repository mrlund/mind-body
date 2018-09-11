import { ActionReducer, Action } from '@ngrx/store';
import * as fromUser from "../actions/user.action";
import { ClassFeedPostViewModel, CommentViewModel } from "@app/core/models"
export interface UserState {
    updateUserLoading: boolean;
    updateUserComplete: boolean;
    updateUserError: any;
    getUserLoading: boolean;
    getUserComplete: boolean;
    getUserError: any;
    userInfo: any;
}

export const initialState: UserState = {
    updateUserLoading: false,
    updateUserComplete: false,
    updateUserError: null,
    getUserLoading: false,
    getUserComplete: false,
    getUserError: null,
    userInfo: null
};

export function reducer(state: UserState = initialState, action: fromUser.UserActions) {
    switch (action.type) {
        case fromUser.GET_USER_INFO: {
            return {
                ...state,
                getUserLoading: true
            };
        }

        case fromUser.GET_USER_INFO_SUCCESS: {
            return {
                ...state,
                getUserLoading: false,
                getUserComplete: true,
                userInfo: action.payload
            };
        }

        case fromUser.GET_USER_INFO_FAIL: {
            return {
                ...state,
                getUserLoading: false,
                getUserComplete: false,
                getUserError: action.payload
            };
        }

        case fromUser.UPDATE_USER_INFO: {
            return {
                ...state,
                updateUserLoading: true
            };
        }

        case fromUser.UPDATE_USER_INFO_SUCCESS: {
            return {
                ...state,
                updateUserLoading: false,
                updateUserComplete: true,
                userInfo: action.payload
            };
        }

        case fromUser.UPDATE_USER_INFO_FAIL: {
            return {
                ...state,
                updateUserLoading: false,
                updateUserComplete: false,
                updateUserError: action.payload
            };
        }

        default:
            return state;
    }
}


export const getUserInfoLoading = (state: UserState) => state.getUserLoading;
export const getUserInfoComplete = (state: UserState) => state.getUserComplete;
export const getUserInfoError = (state: UserState) => state.getUserError;
export const getUserInfo = (state: UserState) => state.userInfo;


export const getUpdateUserInfoLoading = (state: UserState) => state.updateUserLoading;
export const getUpdateUserInfoComplete = (state: UserState) => state.updateUserComplete;
export const getUpdateUserInfoError = (state: UserState) => state.updateUserError;
