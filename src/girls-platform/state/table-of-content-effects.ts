import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { pipe, of, from, interval, merge, fromEvent } from 'rxjs';

import { ICourseModule, CourseContentProvider } from '../interfaces/girls-interfaces';
import { GET_TABLE_OF_CONTENT, getTableOfContent, getTableOfContentSuccess } from './table-of-content-actions';
import { JsonContentProvider } from '../services/JsonContentProvider';


@Injectable()
export class TableOfContentEffects {
    @Effect()
    getTableOfContent$: Observable<Action> = this.actions$.pipe(
        ofType(GET_TABLE_OF_CONTENT),
        mergeMap(action => 
            this.courseProvider.getTableOfContent().pipe(
                // If successful, dispatch success action with result
                map(data => { 
                    //console.log(data);
                    return new getTableOfContentSuccess(data)}),
                // If request fails, dispatch failed action                
        )
    ));

    constructor(private http: HttpClient, private actions$: Actions, private courseProvider : CourseContentProvider) {}
}