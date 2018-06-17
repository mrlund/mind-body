import { createSelector } from "@ngrx/store";

import * as fromTOC from "../reducers/table-of-content.reducer";
import * as fromRoot from "../reducers";

export const getTOCSelectorState = createSelector(
  fromRoot.getTOCState,
  (state: fromTOC.TOCState) => state
);

export const getTableOfContents = createSelector(
  getTOCSelectorState,
  fromTOC.getTableOfContents
);


