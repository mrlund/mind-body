import { ActionReducer, Action } from '@ngrx/store';
import * as PageContentActions from '../actions/page-content.action';
import { IPageModel } from '../../interfaces/girls-interfaces';
import * as fromPageContentAction from "../actions/page-content.action";
import * as fromPageContent from "../actions/page-content.action";

export interface PageContentState {
    page: IPageModel
}

export const initialState: PageContentState = {
    page: null
};

export function reducer(
  state: any = initialState,
  action: fromPageContent.PageContentActions
): PageContentState {
  switch (action.type) {
    case fromPageContent.GET_NEXT_AND_PREV_PAGE_SUCCESS: {
      console.log('reducer');
      return {
        ...state,
        page:action.payload
      };
    }

    default:
      return state;
  }
}

export const getPageContent = (state: PageContentState) => state.page;
