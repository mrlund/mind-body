import * as fromRouter from "@ngrx/router-store";
import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import * as fromRouterReducer from "./router.reducer";
import * as fromTOC from "./table-of-content.reducer";
import * as fromPageContent from "./page-content.reducer";
import * as fromAuth from "./auth.reducer";
import * as fromMood from "./mood.reducer";
import * as fromGww from "./gww.reducer";
import * as fromGoal from "./goal.reducer";
import * as fromUser from "./user.reducer";

export interface State {
  routerReducer: fromRouter.RouterReducerState<
  fromRouterReducer.RouterStateUrl
  >;
  toc: fromTOC.TOCState;
  pageContent: fromPageContent.PageContentState,
  auth: fromAuth.AuthState,
  mood: fromMood.MoodState,
  gww: fromGww.GwwState,
  goal: fromGoal.GoalState,
  user: fromUser.UserState
}
export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  toc: fromTOC.reducer,
  pageContent: fromPageContent.reducer,
  auth: fromAuth.reducer,
  mood: fromMood.reducer,
  gww: fromGww.reducer,
  goal: fromGoal.reducer,
  user: fromUser.reducer
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<fromRouterReducer.RouterStateUrl>
  >("routerReducer");

export const getSelectedRouteParameters = createSelector(
  getRouterState,
  router => router.state && router.state.params
);
export const getTOCState = createFeatureSelector<fromTOC.TOCState>("toc");

export const getPageContentState = createFeatureSelector<fromPageContent.PageContentState>("pageContent");

export const getAuthState = createFeatureSelector<fromAuth.AuthState>("auth");

export const getMoodState = createFeatureSelector<fromMood.MoodState>("mood");

export const getGwwState = createFeatureSelector<fromGww.GwwState>("gww");

export const getGoalState = createFeatureSelector<fromGoal.GoalState>("goal");

export const getUserState = createFeatureSelector<fromUser.UserState>("user");

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<
  fromRouterReducer.RouterStateUrl
  > {
  serialize(
    routerState: RouterStateSnapshot
  ): fromRouterReducer.RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const params = state.params;
    return { url, queryParams, params };
  }
}
