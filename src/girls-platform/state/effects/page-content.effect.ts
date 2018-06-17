import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap, switchMap, map, flatMap, filter } from 'rxjs/operators';
import { pipe, of, from, interval, merge, fromEvent, Observable, forkJoin } from 'rxjs';

import { ICourseModule, CourseContentProvider } from '../../interfaces/girls-interfaces';
import * as PageContentActions from '../actions/page-content.action';
import { JsonContentProvider } from '../../services/JsonContentProvider';

import { IPageModel } from '../../interfaces/girls-interfaces';

@Injectable()
export class PageContentEffects {

    @Effect()
    courseUpdate$: Observable<Action> = this.actions$.ofType('ROUTER_NAVIGATION').pipe(
        filter((n: any) => {
            return n.payload.routerState.url.indexOf('course') > -1
        }),
        switchMap((action: any) => {
            const routerState = action.payload.routerState
            let pageRef = {
                courseModuleUrlPart: routerState.params.courseModuleUrlPart,
                sessionUrlPart: routerState.params.sessionUrlPart,
                pageUrlPart: routerState.params.pageUrlPart,
                courseModuleId: 0,
                sessionId: 0,
                pageId: 0
            };
            return of(new PageContentActions.GetNextAndPrevPage(pageRef))
        }));

    @Effect()
    getPageContent$: Observable<Action> = this.actions$
        .ofType(PageContentActions.GET_NEXT_AND_PREV_PAGE)
        .pipe(map((action: PageContentActions.GetNextAndPrevPage) => action.payload),
        switchMap(payload => {
            return this.contentProvider.getNextAndPrevPage(payload)
                .pipe(
                switchMap((pageContent: IPageModel) => {
                    return this.contentProvider.getPageContent(payload)
                        .pipe(map(pageRef => {
                            pageContent.page.htmlContent = pageRef;
                            return new PageContentActions.GetNextAndPrevPageSuccess(pageContent);
                        }))
                }))

        }));





    constructor(private http: HttpClient, private actions$: Actions, private courseProvider: CourseContentProvider, private contentProvider: JsonContentProvider) { }
}