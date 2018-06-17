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

    aa(){
        //this.pauseAnimation('app-animation',)
    }

    pauseAnimation(ctrlName: string, methodName: string, ...args: any[]) {
        const controller = this.ensureElementInBody(ctrlName);
        return controller.componentOnReady()
            .then(() => (controller as any)[methodName].apply(controller, args));
    }
    ensureElementInBody(elementName: string) {
        let element = document.querySelector(elementName);
        if (!element) {
            element = document.createElement(elementName);
            document.body.appendChild(element);
        }
        return element as HTMLStencilElement;
    }


    public safeHtml(html) {
        if (html && html.length) {
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }
    }

}
