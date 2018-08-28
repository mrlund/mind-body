import { ActionReducer, Action } from '@ngrx/store';
import * as fromGoal from "../actions/goal.action";
import { ClassFeedPostViewModel, CommentViewModel } from "@app/core/models"
export interface GoalState {
    postGoalLoading: boolean;
    postGoalComplete: boolean;
    postGoalError: any;
    getGoalsLoading: boolean;
    getGoalsComplete: boolean;
    getGoalsError: any;
    goals: any[];
}

export const initialState: GoalState = {
    postGoalLoading: false,
    postGoalComplete: false,
    postGoalError: null,
    getGoalsLoading: false,
    getGoalsComplete: false,
    getGoalsError: null,
    goals: []
};

export function reducer(state: GoalState = initialState, action: fromGoal.GoalActions) {
    switch (action.type) {
        case fromGoal.GET_ALL_GOALS: {
            return {
                ...state,
                getGoalsLoading: true
            };
        }

        case fromGoal.GET_ALL_GOALS_SUCCESS: {
            return {
                ...state,
                getGoalsLoading: false,
                getGoalsComplete: true,
                goals: action.payload
            };
        }

        case fromGoal.GET_ALL_GOALS_FAIL: {
            return {
                ...state,
                getGoalsLoading: false,
                getGoalsComplete: false,
                getGoalsError: action.payload
            };
        }

        case fromGoal.POST_GOAL: {
            return {
                ...state,
                postGoalLoading: true
            };
        }
        case fromGoal.POST_GOAL_SUCCESS: {
            return {
                ...state,
                postGoalLoading: false,
                postGoalComplete: true,
                goals: [...state.goals, action.payload]
            };
        }
        case fromGoal.POST_GOAL_FAIL: {
            return {
                ...state,
                postGoalLoading: false,
                postGoalComplete: false,
                postGoalError: action.payload
            };
        }
        case fromGoal.RESET_GOAL_FORM: {
            return {
                ...state,
                postGoalLoading: false,
                postGoalComplete: false,
                postGoalError: null
            };
        }
        default:
            return state;
    }
}


export const getPostGoalLoading = (state: GoalState) => state.postGoalLoading;
export const getPostGoalComplete = (state: GoalState) => state.postGoalComplete;
export const getPostGoalError = (state: GoalState) => state.postGoalError;
export const getAllGoals = (state: GoalState) => state.goals;


export const getGoalsLoading = (state: GoalState) => state.getGoalsLoading;
export const getGoalsComplete = (state: GoalState) => state.getGoalsComplete;
export const getGoalsError = (state: GoalState) => state.getGoalsError;
