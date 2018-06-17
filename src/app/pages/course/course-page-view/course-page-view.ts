import { Component, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


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

    constructor(
        private sanitizer: DomSanitizer,
        private store: Store<fromRootStore.State>,
    ) {
        this.pageModel$ = this.store.select(fromRootStore.getPageContents);
    }
    public safeHtml(html) {
        if (html && html.length) {
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }
    }

}
