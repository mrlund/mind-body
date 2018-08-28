
import { createSelector } from "@ngrx/store";

import * as fromMood from "../reducers/mood.reducer";
import * as fromRoot from "../reducers";

export const getMoodSelectorState = createSelector(
    fromRoot.getMoodState,
    (state: fromMood.MoodState) => state
);

export const getPostMoodComplete = createSelector(
    fromRoot.getMoodState,
    fromMood.getPostMoodComplete
);

export const getPostMoodError = createSelector(
    fromRoot.getMoodState,
    fromMood.getPostMoodError
);

export const getPostMoodLoading = createSelector(
    fromRoot.getMoodState,
    fromMood.getPostMoodLoading
);