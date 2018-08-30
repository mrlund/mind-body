import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MyMoodComponent } from './my-mood/my-mood.component';
import { MyHealthComponent } from './my-health/my-health.component';
import { MyGoalsComponent } from './my-goals/my-goals.component';
import { FindHelpComponent } from './find-help/find-help.component';
import { GreatWallComponent } from './great-wall/great-wall.component';
import { GreatWallItemComponent } from './great-wall/great-wall-item/great-wall-item.component';
import { CommentListPage } from './great-wall/comment-list/comment-list.page';
import { GoalFormPage } from './my-goals/goal-form/goal-form.page';
import { GoalItemComponent } from './my-goals/goal-item/goal-item.component';
import { GoalProgressPage } from './my-goals/goal-progress/goal-progress.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      },
      {
        path: 'find-help',
        component: FindHelpComponent
      },
      {
        path: 'my-mood',
        component: MyMoodComponent
      },
      {
        path: 'my-health',
        component: MyHealthComponent
      },
      {
        path: 'my-goals',
        component: MyGoalsComponent
      },
      {
        path: 'great-wall',
        component: GreatWallComponent
      }
    ])
  ],
  declarations: [HomePage, CommentListPage, GoalFormPage, MyMoodComponent, MyHealthComponent, MyGoalsComponent, FindHelpComponent, GreatWallComponent, GreatWallItemComponent, GoalItemComponent,GoalProgressPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [CommentListPage, GoalFormPage, GoalProgressPage]
})
export class HomePageModule { }
