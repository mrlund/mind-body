import { ActionReducer, Action } from '@ngrx/store';
import * as TableOfContentActions from '../actions/table-of-content.action';
import { ICourse, ICourseModule } from '../../interfaces/girls-interfaces';
import * as fromTOC from "../actions/table-of-content.action";

export interface TOCState {
    contents: ICourse
}

export const initialState: TOCState = {
    contents: { id: 0, urlName:"", name: "", courseModules: new Array<ICourseModule>() }
};
export function reducer(state: TOCState = initialState, action: fromTOC.TableOfContentActions) {
    switch (action.type) {
        case fromTOC.GET_TABLE_OF_CONTENT_SUCCESS:
            return {
                ...state,
                contents: action.payload
            };
        default:
            return state;
    }
}


export const getTableOfContents = (state: TOCState) => state.contents;
