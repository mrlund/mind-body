import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { CoursePage } from './course.page';
import { CoursePageFooter } from './course-page-footer/course-page-footer';
import { CoursePageView } from './course-page-view/course-page-view';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: ':courseModuleUrlPart/:sessionUrlPart/:pageUrlPart',
        component: CoursePage
      }
    ])

  ],
  declarations: [
    CoursePage,
    CoursePageView,
    CoursePageFooter
  ]
})
export class CoursePageModule {}
