import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'gi-goal-item',
  templateUrl: './goal-item.component.html',
  styleUrls: ['./goal-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalItemComponent implements OnInit {
  data: any;
  // @Input('goal') set Goal(goal: any) {
  //   this.data = JSON.parse(goal.AppJsonData);
  //   console.log(this.data)
  // }
  @Input() goal: any
  constructor() { }

  ngOnInit() {
  }

  getData() {
    return JSON.parse(this.goal.AppJsonData);
  }

}
