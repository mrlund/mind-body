import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import * as fromRootStore from "../../../../girls-platform/state/";
import { Store } from '@ngrx/store';

@Component({
  selector: 'gi-my-health',
  templateUrl: './my-health.component.html',
  styleUrls: ['./my-health.component.css']
})
export class MyHealthComponent implements OnInit {
  heartRate: number = 0;
  loading$: Observable<boolean>;
  isAuthorized$: Observable<boolean>;
  error$: Observable<any>;
  isPublic: boolean=true;
  constructor(private store: Store<fromRootStore.State>) {
    this.loading$ = this.store.select(fromRootStore.getPostMoodLoading);
    this.error$ = this.store.select(fromRootStore.getPostMoodError);
    this.isAuthorized$ = this.store.select(fromRootStore.getUserAuthenticated);
  }

  postFeed() {
    var model = {
      CourseClassId: 1,
      PostText: "Heart rate " + this.heartRate + " bpm",
      ExternalResourceUrl: "",
      IsPublic: this.isPublic,
      MiniAppId:2
    }
    console.log(model);
    this.store.dispatch(new fromRootStore.PostMood(model));
  }

  ngOnInit() {
  }

}
