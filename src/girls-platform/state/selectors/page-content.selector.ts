import { createSelector } from "@ngrx/store";

import * as fromPageContent from "../reducers/page-content.reducer";
import * as fromRoot from "../reducers";

export const getPageContentSelectorState = createSelector(
    fromRoot.getPageContentState,
    (state: fromPageContent.PageContentState) => state
);

export const getPageContents = createSelector(
    getPageContentSelectorState,
    fromPageContent.getPageContent
);


