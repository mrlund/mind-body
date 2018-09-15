import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpandableComponent } from './expandable/expandable.component';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [ExpandableComponent],
  exports: [],
  entryComponents: [],
})
export class ComponentsModule { }
