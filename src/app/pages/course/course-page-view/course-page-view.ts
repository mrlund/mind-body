import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'gi-course-page-view',
  templateUrl: 'course-page-view.html',
  styleUrls: ['course-page-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursePageView {

    @Input()
    public pageModel;

    constructor(
        private sanitizer: DomSanitizer
    ) {
        console.log("Loaded");
    }

    public safeHtml(html){
        if (html && html.length){
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }
    }

}
