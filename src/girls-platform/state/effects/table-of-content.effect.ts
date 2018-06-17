import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, map } from 'rxjs/operators';
import { pipe, of, from, interval, merge, fromEvent, Observable } from 'rxjs';

import { ICourseModule, CourseContentProvider } from '../../interfaces/girls-interfaces';
import * as TOCActions from '../actions/table-of-content.action';
import { JsonContentProvider } from '../../services/JsonContentProvider';


@Injectable()
export class TableOfContentEffects {
    @Effect()
    getTableOfContent$: Observable<Action> = this.actions$
        .ofType(TOCActions.GET_TABLE_OF_CONTENT)
        .pipe(
        mergeMap(action =>
            this.courseProvider.getTableOfContent().pipe(
                map(data => new TOCActions.GetTableOfContentSuccess(data))
            )
        ));

    constructor(private http: HttpClient, private actions$: Actions, private courseProvider: CourseContentProvider) { }
}