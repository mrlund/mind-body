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

    public urlMap(url){
        if (url && this.pageModel.page){
            return ['/course', this.pageModel.page.pageReference.courseModuleUrlPart, this.pageModel.page.pageReference.sessionUrlPart, url ];
        }
        return [];
    }

}
