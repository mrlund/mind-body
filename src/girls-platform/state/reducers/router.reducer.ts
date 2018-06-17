import { Params } from "@angular/router";
import * as fromRouter from "@ngrx/router-store";

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export const getRouterURL = (state: RouterStateUrl) => state.url;
export const getRouterParams = (state: RouterStateUrl) => state.params;
export const getRouterQueryParams = (state: RouterStateUrl) => state.queryParams;
