import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import * as fromRootStore from "@platform/state/";
import { Store } from '@ngrx/store';
import { takeWhile, filter } from "rxjs/operators";
import { NavParams, ModalController } from '@ionic/angular';
import { Router } from "@angular/router";
@Component({
  selector: 'gi-goal-form',
  templateUrl: './goal-form.page.html',
  styleUrls: ['./goal-form.page.scss'],
})
export class GoalFormPage implements OnInit {
  isAuthorized$: Observable<boolean>;
  loading$: Observable<boolean>;
  success$: Observable<boolean>;
  category: string = "Emotional";
  alive: boolean = true;
  constructor(private store: Store<fromRootStore.State>, private params: NavParams, private modalController: ModalController, private router: Router) {
    this.isAuthorized$ = this.store.select(fromRootStore.getUserAuthenticated);
    this.loading$ = this.store.select(fromRootStore.getPostGoalLoading);
    this.success$ = this.store.select(fromRootStore.getPostGoalComplete);
    this.success$.pipe(takeWhile(() => this.alive), filter(a => a != false)).subscribe(x => {
      this.dismiss();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
    this.store.dispatch(new fromRootStore.ResetGoalForm())
  }
  postGoal() {
    var jsonObj = {
      Category: this.category
    }
    var obj = {
      MiniAppId: 1,
      AppJsonData: JSON.stringify(jsonObj)
    };
    this.store.dispatch(new fromRootStore.PostGoal(obj));
  }
  dismiss() {
    this.modalController.dismiss();
  }
}
