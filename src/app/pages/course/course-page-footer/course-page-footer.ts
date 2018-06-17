import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'gi-course-page-footer',
    templateUrl: 'course-page-footer.html',
    styleUrls: ['course-page-footer.scss'],
})
export class CoursePageFooter {

    @Input()
    public pageModel;

    constructor(
    ) {

    }

    public urlMap(url) {
        this.pauseAnimation('app-animation', 'pauseAnimation');
        if (url && this.pageModel.page) {
            return ['/course', this.pageModel.page.pageReference.courseModuleUrlPart, this.pageModel.page.pageReference.sessionUrlPart, url];
        }
        return [];
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

}
