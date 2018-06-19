import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MyMoodComponent } from './my-mood/my-mood.component';
import { MyHealthComponent } from './my-health/my-health.component';
import { MyGoalsComponent } from './my-goals/my-goals.component';
import { FindHelpComponent } from './find-help/find-help.component';
import { GreatWallComponent } from './great-wall/great-wall.component';

@NgModule({
  imports: [
    CommonModule,
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
  declarations: [HomePage, MyMoodComponent, MyHealthComponent, MyGoalsComponent, FindHelpComponent, GreatWallComponent]
})
export class HomePageModule {}
