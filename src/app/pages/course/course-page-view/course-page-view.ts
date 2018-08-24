import { Component, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { tap, takeWhile } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs/';
import { Store } from '@ngrx/store';
import * as fromRootStore from "../../../../girls-platform/state/";
import { ActivatedRoute } from "@angular/router";
import { environment } from "@env/environment";
@Component({
    selector: 'gi-course-page-view',
    templateUrl: 'course-page-view.html',
    styleUrls: ['course-page-view.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursePageView {

    public pageModel$: Observable<any>;

    private baseUrl: string = "";
    baseServerUrl: string = "";
    public pageContentUrl: string = "none yet";
    private alive: boolean = true;
    classRoomMode$: Observable<boolean>;

    constructor(
        private sanitizer: DomSanitizer,
        private store: Store<fromRootStore.State>,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute
    ) {
        this.baseServerUrl=environment.apiUrl;
        let pageRef = {
            courseModuleUrlPart: route.snapshot.params.courseModuleUrlPart,
            sessionUrlPart: route.snapshot.params.sessionUrlPart,
            pageUrlPart: route.snapshot.params.pageUrlPart,
            courseModuleId: 0,
            sessionId: 0,
            pageId: 0
        };
        this.baseUrl = "/assets/content/" + route.snapshot.params.courseModuleUrlPart + "/" + route.snapshot.params.sessionUrlPart;
        this.pageContentUrl = this.baseUrl + "/" + route.snapshot.params.pageUrlPart;
        this.store.dispatch(new fromRootStore.GetNextAndPrevPage(pageRef));

        this.pageModel$ = this.store.select(fromRootStore.getPageContents);
        this.classRoomMode$ = this.store.select(fromRootStore.getClassRoomMode);
        this.classRoomMode$.pipe(takeWhile(() => this.alive)).subscribe((val) => {
            // this.callWebComponentMethod('gi-data-provider', 'classRoomModeChanged', val);
            this.callWebComponentMethod('gi-animation', 'classRoomModeChanged', val);
        })
        // this.pageModel$.pipe(takeWhile(() => this.alive)).subscribe((x) => {
        //     if (x && x.page) {
        //         this.baseUrl = "/assets/content/" + x.page.pageReference.courseModuleUrlPart + "/" + x.page.pageReference.sessionUrlPart;
        //         this.pageContentUrl = this.baseUrl + "/" + x.page.pageReference.pageUrlPart;
        //         console.log("baseUrl", this.baseUrl);
        //         console.log("pageConentUrl", this.pageContentUrl);
        //     }
        // });
    }

    ionViewDidLeave() {
        this.alive = false;
        console.log('ionViewDidLeave');
        this.callWebComponentMethod('gi-animation', 'destroyAnimation');
    }
    public safeHtml(html) {
        if (html && html.length) {

            html = html.replace(/BASE_URL/g, this.baseUrl);
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }
    }

    callWebComponentMethod(elementName: string, methodName: string, ...args: any[]) {
        const controller = document.querySelector(elementName) as HTMLStencilElement;
        if (controller) {
            return controller.componentOnReady()
                .then(() => (controller as any)[methodName].apply(controller, args));
        }
    }
    callWebComponentsMethod(elementName: string, methodName: string, ...args: any[]) {
        const controllers = document.querySelectorAll(elementName) as NodeListOf<HTMLStencilElement>;
        console.log(controllers);
        for (var i = 0; i < controllers.length; i++) {
            if (controllers[i]) {
                return controllers[i].componentOnReady()
                    .then(() => (controllers[i] as any)[methodName].apply(controllers[i], args));
            }
        }
    }
}
