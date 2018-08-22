import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { pipe } from 'rxjs/';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRootStore from "../../../../girls-platform/state/";
@Component({
    selector: 'gi-course-page-view',
    templateUrl: 'course-page-view.html',
    styleUrls: ['course-page-view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursePageView {

    public pageModel$;

    private baseUrl: string ="";
    public pageContentUrl: string = "none yet";
    

    constructor(
        private sanitizer: DomSanitizer,
        private store: Store<fromRootStore.State>,
    ) {
        this.pageModel$ = this.store.select(fromRootStore.getPageContents);
        this.pageModel$.subscribe(
            // pipe(
            // tap(x=> {
                x=> {
                    if (x && x.page){
                        this.baseUrl = "/assets/content/" +  x.page.pageReference.courseModuleUrlPart + "/" + x.page.pageReference.sessionUrlPart;
                        this.pageContentUrl = this.baseUrl + "/" + x.page.pageReference.pageUrlPart; 
                        console.log(this.pageContentUrl);
                    }
                } 
                // if(x.page){
                // }
            // }))
        );
    }
    public safeHtml(html) {
        if (html && html.length) {

            html = html.replace(/BASE_URL/g, this.baseUrl);
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }
    }

}
