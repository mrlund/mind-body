import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { GoalProgressPage } from "../goal-progress/goal-progress.page";
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'gi-goal-item',
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalItemComponent implements OnInit {
  data: any;
  id: number;
  @Input('goal') set Goal(goal: any) {
    this.data = JSON.parse(goal.AppJsonData);
    this.id = goal.StudentAppDataId
  }
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async openProgressModal(comments: any[]) {
    const modal = await this.modalController.create({
      component: GoalProgressPage,
      componentProps: { goal: this.data, id: this.id }
    });
    return await modal.present();
  }


}
