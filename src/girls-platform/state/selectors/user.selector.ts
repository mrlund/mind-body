
import { createSelector } from "@ngrx/store";

import * as fromUser from "../reducers/user.reducer";
import * as fromRoot from "../reducers";

export const getUserSelectorState = createSelector(
    fromRoot.getUserState,
    (state: fromUser.UserState) => state
);

export const getUserInfoLoading = createSelector(
    fromRoot.getUserState,
    fromUser.getUserInfoLoading
);

export const getUserInfoComplete = createSelector(
    fromRoot.getUserState,
    fromUser.getUserInfoComplete
);

export const getUserInfoError = createSelector(
    fromRoot.getUserState,
    fromUser.getUserInfoError
);
export const getUserInfo = createSelector(
    fromRoot.getUserState,
    fromUser.getUserInfo
);


export const getUpdateUserInfoLoading = createSelector(
    fromRoot.getUserState,
    fromUser.getUpdateUserInfoLoading
);

export const getUpdateUserInfoComplete = createSelector(
    fromRoot.getUserState,
    fromUser.getUpdateUserInfoComplete
);

export const getUpdateUserInfoError = createSelector(
    fromRoot.getUserState,
    fromUser.getUpdateUserInfoError
);


export const getUploadUserImageLoading = createSelector(
    fromRoot.getUserState,
    fromUser.getUploadUserImageLoading
);

export const getUploadUserImageComplete = createSelector(
    fromRoot.getUserState,
    fromUser.getUploadUserImageComplete
);

export const getUploadUserImageError = createSelector(
    fromRoot.getUserState,
    fromUser.getUploadUserImageError
);

export const getEnrollLoading = createSelector(
    fromRoot.getUserState,
    fromUser.getEnrollLoading
);

export const getEnrollComplete = createSelector(
    fromRoot.getUserState,
    fromUser.getEnrollComplete
);

export const getEnrollError = createSelector(
    fromRoot.getUserState,
    fromUser.getEnrollError
);

export const getEnrollList = createSelector(
    fromRoot.getUserState,
    fromUser.getEnrollList
);
export const getEnrollListLoading = createSelector(
    fromRoot.getUserState,
    fromUser.getEnrollListLoading
);

export const getEnrollListComplete = createSelector(
    fromRoot.getUserState,
    fromUser.getEnrollListComplete
);

export const getEnrollListError = createSelector(
    fromRoot.getUserState,
    fromUser.getEnrollListError
);


export const getLeaveClassLoading = createSelector(
    fromRoot.getUserState,
    fromUser.getLeaveClassLoading
);

export const getLeaveClassComplete = createSelector(
    fromRoot.getUserState,
    fromUser.getLeaveClassComplete
);

export const getLeaveClassError = createSelector(
    fromRoot.getUserState,
    fromUser.getLeaveClassError
);