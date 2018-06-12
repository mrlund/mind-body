import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../girls-platform/state/table-of-content-state';
import { Store } from '@ngrx/store';
import { CourseContentProvider } from '../../../girls-platform/interfaces/girls-interfaces';
import { switchMap, mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'gi-page-course',
  template: `<gi-course-page-view class="ion-page" [pageModel]="pageModel$ | async"></gi-course-page-view>`,
  styleUrls: ['course.page.scss'],
})
export class CoursePage {
  public pageModel$;

  constructor(
    private route: ActivatedRoute,
    private courseProvider : CourseContentProvider

  ){}

  ngOnInit(){
    this.pageModel$ = this.route.paramMap.pipe(
      tap(x=>console.log("route changed: " + x.get('pageUrlPart'))),
      switchMap(routeParams => {
        let pageRef = {
          courseModuleUrlPart: routeParams.get('courseModuleUrlPart'), 
          sessionUrlPart: routeParams.get('sessionUrlPart'), 
          pageUrlPart:  routeParams.get('pageUrlPart'),
          courseModuleId: 0,
          sessionId: 0,
          pageId: 0 
        };            
        return this.courseProvider.getNextAndPrevPage(pageRef).pipe(
          //tap(x=>console.log(x)),
          mergeMap(x=> this.courseProvider.getPageContent(pageRef), (x, y) => { x.page.htmlContent = y; return x})
      )})
    )
  }
}
