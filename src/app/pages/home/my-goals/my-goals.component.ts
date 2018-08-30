import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from "rxjs";
import * as fromRootStore from "../../../../girls-platform/state/";
import { Store } from '@ngrx/store';
import { GoalFormPage } from "./goal-form/goal-form.page";
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'gi-my-goals',
  templateUrl: './my-goals.component.html',
  styleUrls: ['./my-goals.component.css'],
})
//TODO:Goals not updated after it is added if OnPush enabled
export class MyGoalsComponent implements OnInit {
  goals$: Observable<any[]>;
  loading$: Observable<boolean>;
  isAuthorized$: Observable<boolean>;
  constructor(private store: Store<fromRootStore.State>, private modalController: ModalController) {
    //    this.store.dispatch(new fromRootStore.GetAllPosts());
    this.goals$ = this.store.select(fromRootStore.getAllGoals);
    this.loading$ = this.store.select(fromRootStore.getAllGoalsLoading);
    this.isAuthorized$ = this.store.select(fromRootStore.getUserAuthenticated);
  }

  ngOnInit() {
    this.store.dispatch(new fromRootStore.GetAllGoals(1));
  }

  async openAddPage() {
    const modal = await this.modalController.create({
      component: GoalFormPage,
    });
    return await modal.present();
  }
}
