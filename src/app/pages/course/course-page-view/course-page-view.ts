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
                        this.pageContentUrl = "/assets/content/" +  x.page.pageReference.courseModuleUrlPart + "/" + x.page.pageReference.sessionUrlPart; //"/"+ x.page.pageReference.pageUrlPart
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
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }
    }

}
