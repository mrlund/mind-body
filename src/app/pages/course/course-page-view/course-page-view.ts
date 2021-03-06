import { Component, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, AfterViewInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { tap, takeWhile } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs/';
import { Store } from '@ngrx/store';
import * as fromRootStore from "../../../../girls-platform/state/";
import { JsonContentProvider } from "../../../../girls-platform/services/JsonContentProvider";
import { ActivatedRoute } from "@angular/router";
import { environment } from "@env/environment";
import { SignalRService } from '../../../../girls-platform/services/SignalRService';

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
    private eventEmitter : (user,data) => void;

    public pageIdInfo: any; 

    pageRef: any;
    constructor(
        private sanitizer: DomSanitizer,
        private store: Store<fromRootStore.State>,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private jsonContentProvider: JsonContentProvider,
        public signalR: SignalRService,
        private el: ElementRef
    ) {
        this.eventEmitter = (user, data) => {
            console.log(user, data, this.el.nativeElement);
            let event = new CustomEvent('receivedSignalREvent', { detail: JSON.parse(data) });
            document.body.dispatchEvent(event);
        }
        this.signalR.signalRConn.on("SendMessage", this.eventEmitter);

        this.baseServerUrl = environment.apiUrl;
        this.pageRef = {
            courseModuleUrlPart: route.snapshot.params.courseModuleUrlPart,
            sessionUrlPart: route.snapshot.params.sessionUrlPart,
            pageUrlPart: route.snapshot.params.pageUrlPart,
            courseModuleId: 0,
            sessionId: 0,
            pageId: 0
        };
        this.baseUrl = "/assets/content/" + route.snapshot.params.courseModuleUrlPart + "/" + route.snapshot.params.sessionUrlPart;
        this.pageContentUrl = this.baseUrl + "/" + route.snapshot.params.pageUrlPart;
        this.store.dispatch(new fromRootStore.GetNextAndPrevPage(this.pageRef));

        this.pageIdInfo = this.jsonContentProvider.getIdFromPage(this.pageRef);

        this.pageModel$ = this.store.select(fromRootStore.getPageContents);
        // this.pageModel$.pipe(takeWhile(() => this.alive)).subscribe((x) => {
        //     //TODO: on refresh not calling getIdInfo function
        //     var data = this.jsonContentProvider.getIdFromPage(this.pageRef);
        //     this.callWebComponentMethod('gi-data-provider', 'getIdInfo', data);
        // })
        this.classRoomMode$ = this.store.select(fromRootStore.getClassRoomMode);
        this.classRoomMode$.pipe(takeWhile(() => this.alive)).subscribe((val) => {
            this.callWebComponentsMethod('gi-animation', 'classRoomModeChanged', val);
            this.callWebComponentsMethod('gi-youtube', 'classRoomModeChanged', val);
        })

    }
    // getPageIdInfo() {
    //     var data = this.jsonContentProvider.getIdFromPage(this.pageRef);
    //     this.callWebComponentMethod('gi-data-provider', 'getIdInfo', data);
    // }
    ionViewDidLeave() {
        this.alive = false;
        this.callWebComponentsMethod('gi-animation', 'destroyAnimation');
        this.signalR.signalRConn.off("SendMessage", this.eventEmitter);
    }
    public safeHtml(html) {
        if (html && html.length) {

            html = html.replace(/BASE_URL/g, this.baseUrl);
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }
    }
    public getStateObservable(name) {
        return this[name];
    }

    callWebComponentMethod(elementName: string, methodName: string, ...args: any[]) {
        const controller = document.querySelector(elementName) as HTMLStencilElement;
        if (controller) {
            return controller.componentOnReady()
                .then(() => (controller as any)[methodName].apply(controller, args));
        }
    }
    async callWebComponentsMethod(elementName: string, methodName: string, ...args: any[]) {
        const components = document.querySelectorAll(elementName) as NodeListOf<HTMLStencilElement>;
        var componentArray = Array.from(components);
        for (var i = 0; i < componentArray.length; i++) {

            //  console.log("webcomp call", componentArray[i]);
            if (componentArray[i]) {
                await componentArray[i].componentOnReady();
                await (componentArray[i] as any)[methodName].apply(componentArray[i], args);
            }
        }
    }
}
