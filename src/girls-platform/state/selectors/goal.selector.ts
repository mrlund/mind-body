
import { createSelector } from "@ngrx/store";

import * as fromGoal from "../reducers/goal.reducer";
import * as fromRoot from "../reducers";

export const getGoalSelectorState = createSelector(
    fromRoot.getGoalState,
    (state: fromGoal.GoalState) => state
);

export const getAllGoals = createSelector(
    fromRoot.getGoalState,
    fromGoal.getAllGoals
);

export const getAllGoalsComplete = createSelector(
    fromRoot.getGoalState,
    fromGoal.getGoalsComplete
);

export const getAllGoalsError = createSelector(
    fromRoot.getGoalState,
    fromGoal.getGoalsError
);

export const getAllGoalsLoading = createSelector(
    fromRoot.getGoalState,
    fromGoal.getGoalsLoading
);



export const getPostGoalLoading = createSelector(
    fromRoot.getGoalState,
    fromGoal.getPostGoalLoading
);

export const getPostGoalComplete = createSelector(
    fromRoot.getGoalState,
    fromGoal.getPostGoalComplete
);

export const getPostGoalError = createSelector(
    fromRoot.getGoalState,
    fromGoal.getPostGoalError
);
