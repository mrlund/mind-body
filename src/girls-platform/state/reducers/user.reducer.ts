import { ActionReducer, Action } from '@ngrx/store';
import * as fromUser from "../actions/user.action";
import { ClassFeedPostViewModel, CommentViewModel } from "@app/core/models"
export interface UserState {
    updateUserLoading: boolean;
    updateUserComplete: boolean;
    updateUserError: any;
    uploadUserImageLoading: boolean;
    uploadUserImageComplete: boolean;
    uploadUserImageError: any;
    getUserLoading: boolean;
    getUserComplete: boolean;
    getUserError: any;
    userInfo: any;
}

export const initialState: UserState = {
    updateUserLoading: false,
    updateUserComplete: false,
    updateUserError: null,
    uploadUserImageLoading: false,
    uploadUserImageComplete: false,
    uploadUserImageError: null,
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
            updateLocalStorageName(action.payload.Name);
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

        case fromUser.UPLOAD_PROFILE_IMAGE: {
            return {
                ...state,
                uploadUserImageLoading: true
            };
        }

        case fromUser.UPLOAD_PROFILE_IMAGE_SUCCESS: {
            var user = { ...state.userInfo, ProfileImageUrl: action.payload[0].FullImageUrl };
            updateLocalStorageProfileImageUrl(action.payload[0].FullImageUrl);
            return {
                ...state,
                uploadUserImageLoading: false,
                uploadUserImageComplete: true,
                userInfo: user
            };
        }

        case fromUser.UPLOAD_PROFILE_IMAGE_FAIL: {
            return {
                ...state,
                uploadUserImageLoading: false,
                uploadUserImageComplete: false,
                uploadUserImageError: action.payload
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


export const getUploadUserImageLoading = (state: UserState) => state.uploadUserImageLoading;
export const getUploadUserImageComplete = (state: UserState) => state.uploadUserImageComplete;
export const getUploadUserImageError = (state: UserState) => state.uploadUserImageError;


function updateLocalStorageProfileImageUrl(profileUrl) {
    var currentUser = JSON.parse(JSON.parse(localStorage.getItem('currentUser')));
    currentUser.ProfileImageUrl = profileUrl;
    localStorage.setItem("currentUser", JSON.stringify(JSON.stringify(currentUser)));
}
function updateLocalStorageName(name) {
    var currentUser = JSON.parse(JSON.parse(localStorage.getItem('currentUser')));
    currentUser.Name = name;
    localStorage.setItem("currentUser", JSON.stringify(JSON.stringify(currentUser)));
}