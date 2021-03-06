import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CourseContentProvider } from '../../../girls-platform/interfaces/girls-interfaces';
import { switchMap, mergeMap, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as fromRootStore from "../../../girls-platform/state/";
@Component({
  selector: 'gi-page-course',
  //template: `<gi-course-page-view class="ion-page" [pageModel]="pageModel$ | async"></gi-course-page-view>`,
  templateUrl: 'course.page.html',
  styleUrls: ['course.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursePage implements OnDestroy {
  public pageModel$;
  public parameters$: Observable<any>;

  public contentRoot: string;

  constructor(
    private route: ActivatedRoute,
    private courseProvider: CourseContentProvider,
    private store: Store<fromRootStore.State>,
  ) {
  }


  ngOnInit() {
    this.pageModel$ = this.store.select(fromRootStore.getPageContents);

    this.contentRoot = "";
  }

  ngOnDestroy() {
  }
}
