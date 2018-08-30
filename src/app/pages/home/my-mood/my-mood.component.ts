import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from "rxjs";
import * as fromRootStore from "../../../../girls-platform/state/";
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'gi-my-mood',
  templateUrl: './my-mood.component.html',
  styleUrls: ['./my-mood.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyMoodComponent implements OnInit {
  loading$: Observable<boolean>;
  isAuthorized$: Observable<boolean>;
  error$: Observable<any>;
  moodText: string;
  currentStep: number = 1;
  mood: string = "Anger";
  moodLevel: string = "1";
  picture: string = "anger.jpg";
  isPublic: boolean = true;
  constructor(
    private store: Store<fromRootStore.State>,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.loading$ = this.store.select(fromRootStore.getPostMoodLoading);
    this.error$ = this.store.select(fromRootStore.getPostMoodError);
    this.isAuthorized$ = this.store.select(fromRootStore.getUserAuthenticated);
  }
  ionViewWillEnter() {
    this.currentStep = 1;
    this.cd.markForCheck();
  }
  ngOnInit() {
  }

  postFeed() {
    //<gi-mood-image src="${this.picture}"></gi-mood-image>
    var model = {
      CourseClassId: 1,
      PostText: `Mood- ${this.mood} and Level: ${this.moodLevel} <gi-mood-image src="${this.picture}"></gi-mood-image>`,
      ExternalResourceUrl: "",
      IsPublic: this.isPublic
    }
    this.store.dispatch(new fromRootStore.PostMood(model));
  }
  moodChanged(val) {
    this.moodText = val.detail;
  }
  nextStep() {
    this.currentStep = this.currentStep + 1;
  }
  backStep() {
    if (this.currentStep > 1) {
      this.currentStep = this.currentStep - 1;
    }
    else {
      this.router.navigateByUrl('/home');
    }
  }

}
