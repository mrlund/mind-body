import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from "rxjs";
import * as fromRootStore from "../../../../girls-platform/state/";
import { Store } from '@ngrx/store';
@Component({
  selector: 'gi-my-mood',
  templateUrl: './my-mood.component.html',
  styleUrls: ['./my-mood.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyMoodComponent implements OnInit {
  moodLevel: number;
  loading$: Observable<boolean>;
  isAuthorized$: Observable<boolean>;
  error$: Observable<any>;
  moodText: string;
  constructor(
    private store: Store<fromRootStore.State>
  ) {
    this.loading$ = this.store.select(fromRootStore.getPostMoodLoading);
    this.error$ = this.store.select(fromRootStore.getPostMoodError);
    this.isAuthorized$ = this.store.select(fromRootStore.getUserAuthenticated);
  }

  ngOnInit() {
  }

  postFeed() {
    var model = {
      CourseClassId: 1,
      PostText: "Mood " + this.moodText,
      ExternalResourceUrl: ""
    }
    console.log(model);
    this.store.dispatch(new fromRootStore.PostMood(model));
  }
  moodChanged(val) {
    this.moodText = val.detail;
  }

}
