import { ActionReducer, Action } from '@ngrx/store';
import * as fromGoal from "../actions/goal.action";
import { ClassFeedPostViewModel, CommentViewModel } from "@app/core/models"
export interface GoalState {
    postGoalLoading: boolean;
    postGoalComplete: boolean;
    postGoalError: any;
    postGoalProgressLoading: boolean;
    postGoalProgressComplete: boolean;
    postGoalProgressError: any;
    getGoalsLoading: boolean;
    getGoalsComplete: boolean;
    getGoalsError: any;
    goals: any[];
}

export const initialState: GoalState = {
    postGoalLoading: false,
    postGoalComplete: false,
    postGoalError: null,
    postGoalProgressLoading: false,
    postGoalProgressComplete: false,
    postGoalProgressError: null,
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
            state.goals.unshift(action.payload);
            return {
                ...state,
                postGoalLoading: false,
                postGoalComplete: true,
                goals: state.goals
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

        case fromGoal.POST_GOAL_PROGRESS: {
            return {
                ...state,
                postGoalProgressLoading: true
            };
        }
        case fromGoal.POST_GOAL_PROGRESS_SUCCESS: {
            var goals = state.goals.map(goal => {
                if (
                    goal.StudentAppDataId === action.payload.StudentAppDataId
                ) {
                    return action.payload
                }
                return goal;
            });

            return {
                ...state,
                postGoalProgressLoading: false,
                postGoalProgressComplete: true,
                goals: goals
            };
        }
        case fromGoal.POST_GOAL_PROGRESS_FAIL: {
            return {
                ...state,
                postGoalProgressLoading: false,
                postGoalProgressComplete: false,
                postGoalProgressError: action.payload
            };
        }
        case fromGoal.RESET_GOAL_FORM: {
            return {
                ...state,
                postGoalLoading: false,
                postGoalComplete: false,
                postGoalError: null,
                postGoalProgressLoading: false,
                postGoalProgressComplete: false,
                postGoalProgressError: null
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

export const getPostGoalProgressLoading = (state: GoalState) => state.postGoalProgressLoading;
export const getPostGoalProgressComplete = (state: GoalState) => state.postGoalProgressComplete;
export const getPostGoalProgressError = (state: GoalState) => state.postGoalProgressError;



