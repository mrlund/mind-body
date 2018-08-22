import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController } from "@ionic/angular"

@Component({
    selector: 'gi-course-page-footer',
    templateUrl: 'course-page-footer.html',
    styleUrls: ['course-page-footer.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursePageFooter {

    @Input()
    public pageModel;

    constructor(private navCtrl: NavController) {

    }
    nextOrPrev(url) {
        this.pauseAnimation('gi-animation', 'canvasPauseAnimation');
        if (url && this.pageModel.page) {
            // this.pauseAnimation('app-animation', 'canvasPlayAnimation');
            this.navCtrl.goRoot('/course/' + this.pageModel.page.pageReference.courseModuleUrlPart + "/" + this.pageModel.page.pageReference.sessionUrlPart + "/" + url)
            // return ['/course', this.pageModel.page.pageReference.courseModuleUrlPart, this.pageModel.page.pageReference.sessionUrlPart, url];
        }
        return [];
    }

    pauseAnimation(elementName: string, methodName: string, ...args: any[]) {
        const controller = document.querySelector(elementName) as HTMLStencilElement;
        if (controller) {
            return controller.componentOnReady()
                .then(() => (controller as any)[methodName].apply(controller, args));
        }
    }
    ngOnDestroy() {
        console.log('dest');
    }


}
