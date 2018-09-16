import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import * as fromRootStore from "@platform/state";
import { Store } from '@ngrx/store';

import { takeWhile, filter } from "rxjs/operators";
@Component({
  selector: 'gi-goal-progress',
  templateUrl: './goal-progress.page.html',
  styleUrls: ['./goal-progress.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalProgressPage implements OnInit {
  goal: any;
  progressForm: FormGroup;
  isAuthorized$: Observable<boolean>;
  loading$: Observable<boolean>;
  submitted: boolean;
  success$: Observable<boolean>;
  alive: boolean = true;
  studentAppDataId: number;
  constructor(private store: Store<fromRootStore.State>, private params: NavParams, private modalController: ModalController, private fb: FormBuilder) {
    this.goal = params.data.goal;
    this.studentAppDataId = params.data.id;
    console.log(this.goal);
    this.createForm();
    this.isAuthorized$ = this.store.select(fromRootStore.getUserAuthenticated);
    this.loading$ = this.store.select(fromRootStore.getPostGoalProgressLoading);
    this.success$ = this.store.select(fromRootStore.getPostGoalProgressComplete);
    this.success$.pipe(takeWhile(() => this.alive), filter(a => a != false)).subscribe(x => {
      this.dismiss();
    });
  }

  createForm() {
    this.progressForm = this.fb.group({
      GoalText: [this.goal.GoalText, Validators.required],
      Progress: [this.goal.Percentage, [Validators.required, Validators.min(1)]],
      IsPublic: [true, Validators.required]
    });
  }
  dismiss() {
    this.modalController.dismiss();
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new fromRootStore.ResetGoalForm())
  }

  postToFeed() {
    this.submitted = true;
    var model = {
      CourseClassId: 1,
      PostText: "Goal update: " + this.goal.Name + " " + this.progressForm.get('GoalText').value + " Progress:" + this.progressForm.get('Progress').value,
      ExternalResourceUrl: "",
      IsPublic: this.progressForm.get('IsPublic').value,
      Percentage: this.progressForm.get('Progress').value,
      IsProgress: true,
      StudentAppDataId: this.studentAppDataId,
      GoalText: this.progressForm.get('GoalText').value,
      MiniAppId: 1
    }
    console.log(model);
    this.store.dispatch(new fromRootStore.PostGoalProgress(model));
  }

}
