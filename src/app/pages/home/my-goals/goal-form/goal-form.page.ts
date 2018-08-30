import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from "rxjs";
import * as fromRootStore from "@platform/state/";
import { Store } from '@ngrx/store';
import { takeWhile, filter } from "rxjs/operators";
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms"
@Component({
  selector: 'gi-goal-form',
  templateUrl: './goal-form.page.html',
  styleUrls: ['./goal-form.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalFormPage implements OnInit {
  isAuthorized$: Observable<boolean>;
  loading$: Observable<boolean>;
  success$: Observable<boolean>;
  category: string = "Emotional";
  alive: boolean = true;
  goalForm: FormGroup;
  constructor(private store: Store<fromRootStore.State>, private params: NavParams, private modalController: ModalController, private router: Router, private fb: FormBuilder) {
    this.isAuthorized$ = this.store.select(fromRootStore.getUserAuthenticated);
    this.loading$ = this.store.select(fromRootStore.getPostGoalLoading);
    this.success$ = this.store.select(fromRootStore.getPostGoalComplete);
    this.success$.pipe(takeWhile(() => this.alive), filter(a => a != false)).subscribe(x => {
      this.dismiss();
    });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.goalForm = this.fb.group({
      Name: ['', Validators.required],
      Description: [''],
      Category: ['', Validators.required],
    })

  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new fromRootStore.ResetGoalForm())
  }
  postGoal() {
    if (this.goalForm.valid) {
      var obj = {
        MiniAppId: 1,
        AppJsonData: JSON.stringify(this.goalForm.value)
      };
      console.log(obj);
      this.store.dispatch(new fromRootStore.PostGoal(obj));
    }
    else {
      console.log('form invalid')
    }
  }
  dismiss() {
    this.modalController.dismiss();
  }
}
