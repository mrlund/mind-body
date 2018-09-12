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
        if (url && this.pageModel.page) {
            // this.pauseAnimation('app-animation', 'canvasPlayAnimation');
            this.navCtrl.navigateRoot('/course/' + this.pageModel.page.pageReference.courseModuleUrlPart + "/" + this.pageModel.page.pageReference.sessionUrlPart + "/" + url)
            // return ['/course', this.pageModel.page.pageReference.courseModuleUrlPart, this.pageModel.page.pageReference.sessionUrlPart, url];
        }
        return [];
    }

}
