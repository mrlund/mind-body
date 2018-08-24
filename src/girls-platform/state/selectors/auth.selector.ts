import { createSelector } from "@ngrx/store";

import * as fromAuth from "../reducers/auth.reducer";
import * as fromRoot from "../reducers";

export const getAuthSelectorState = createSelector(
    fromRoot.getAuthState,
    (state: fromAuth.AuthState) => state
);

export const getLoginUserLoading = createSelector(
    getAuthSelectorState,
    fromAuth.getLoginUserLoading
);
export const getLoginUserComplete = createSelector(
    getAuthSelectorState,
    fromAuth.getLoginUserComplete
);
export const getLoginUserError = createSelector(
    getAuthSelectorState,
    fromAuth.getLoginUserError
);
export const getLoggedinUser = createSelector(
    getAuthSelectorState,
    fromAuth.getLoggedinUser
);

export const getSignupUserLoading = createSelector(
    getAuthSelectorState,
    fromAuth.getSignupUserLoading
);
export const getSignupUserComplete = createSelector(
    getAuthSelectorState,
    fromAuth.getSignupUserComplete
);
export const getSignupUserError = createSelector(
    getAuthSelectorState,
    fromAuth.getSignupUserError
);

export const getUserAuthenticated = createSelector(
    getAuthSelectorState,
    fromAuth.getUserAuthenticated
);


export const getForgotPasswordLoading = createSelector(
    getAuthSelectorState,
    fromAuth.getForgotPasswordLoading
);


export const getForgotPasswordComplete = createSelector(
    getAuthSelectorState,
    fromAuth.getForgotPasswordComplete
);


export const getForgotPasswordError = createSelector(
    getAuthSelectorState,
    fromAuth.getForgotPasswordError
);

export const getClassRoomMode = createSelector(
    getAuthSelectorState,
    fromAuth.getClassRoomMode
);


