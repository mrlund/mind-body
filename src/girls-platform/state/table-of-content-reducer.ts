import {ActionReducer, Action} from '@ngrx/store'; 
import * as TableOfContentActions from './table-of-content-actions';
import { TableOfContentState } from './table-of-content-state';
import { ICourseModule } from '../interfaces/girls-interfaces';

export const initialState: ICourseModule[] = new Array<ICourseModule>()

export function TableOfContentReducer(state : ICourseModule[] = initialState, action : TableOfContentActions.Actions ) {
    switch (action.type){
        case TableOfContentActions.GET_TABLE_OF_CONTENT_SUCCESS:
            //console.log(action.payload);
            return action.payload;
        default: 
            return state;
    }
}

