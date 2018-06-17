import * as fromRouter from "@ngrx/router-store";
import { ActionReducerMap, createFeatureSelector ,createSelector} from "@ngrx/store";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import * as fromRouterReducer from "./router.reducer";
import * as fromTOC from "./table-of-content.reducer";
import * as fromPageContent from "./page-content.reducer";

export interface State {
  routerReducer: fromRouter.RouterReducerState<
    fromRouterReducer.RouterStateUrl
  >;
  toc: fromTOC.TOCState;
  pageContent:fromPageContent.PageContentState
}
export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  toc: fromTOC.reducer,
  pageContent: fromPageContent.reducer
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
