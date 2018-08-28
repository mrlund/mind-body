
import { createSelector } from "@ngrx/store";

import * as fromGww from "../reducers/gww.reducer";
import * as fromRoot from "../reducers";

export const getGwwSelectorState = createSelector(
    fromRoot.getGwwState,
    (state: fromGww.GwwState) => state
);

export const getPostLoadLoading = createSelector(
    fromRoot.getGwwState,
    fromGww.getPostLoadLoading
);

export const getPostLoadComplete = createSelector(
    fromRoot.getGwwState,
    fromGww.getPostLoadComplete
);

export const getPostLoadError = createSelector(
    fromRoot.getGwwState,
    fromGww.getPostLoadError
);

export const getAllPosts = createSelector(
    fromRoot.getGwwState,
    fromGww.getAllPosts
);

export const getPostCommentLoading = createSelector(
    fromRoot.getGwwState,
    fromGww.getPostCommentLoading
);

export const getPostCommentComplete = createSelector(
    fromRoot.getGwwState,
    fromGww.getPostCommentComplete
);

export const getPostCommentError = createSelector(
    fromRoot.getGwwState,
    fromGww.getPostCommentError
);