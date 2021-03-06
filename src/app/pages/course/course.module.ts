import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
        path: '',
        component: CoursePage,
        children: [{
          path: ':courseModuleUrlPart/:sessionUrlPart/:pageUrlPart',
          component: CoursePageView
        }]
      }

    ])
  ],
  declarations: [
    CoursePage,
    CoursePageView,
    CoursePageFooter
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class CoursePageModule { }
