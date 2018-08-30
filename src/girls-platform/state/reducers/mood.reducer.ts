import { ActionReducer, Action } from '@ngrx/store';
import * as fromMood from "../actions/mood.action";

export interface MoodState {
    postMoodLoading: boolean;
    postMoodComplete: boolean;
    postMoodError: any;
}

export const initialState: MoodState = {
    postMoodLoading: false,
    postMoodComplete: false,
    postMoodError: null
};

export function reducer(state: MoodState = initialState, action: fromMood.MoodActions) {
    switch (action.type) {
        case fromMood.POST_MOOD:
            return {
                ...state,
                postMoodLoading: true
            };

        case fromMood.POST_MOOD_SUCCESS:
            return {
                ...state,
                postMoodLoading: false,
                postMoodComplete: true
            };

        case fromMood.POST_MOOD_FAIL:
            return {
                ...state,
                postMoodLoading: false,
                postMoodComplete: false,
                postMoodError: action.payload
            };
        case fromMood.RESET_CLASS_FEED:
            return {
                ...state,
                postMoodLoading: false,
                postMoodComplete: false,
                postMoodError: null
            };
        default:
            return state;
    }
}


export const getPostMoodLoading = (state: MoodState) => state.postMoodLoading;
export const getPostMoodComplete = (state: MoodState) => state.postMoodComplete;
export const getPostMoodError = (state: MoodState) => state.postMoodError;
