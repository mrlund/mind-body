import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpandableComponent } from './expandable/expandable.component';
import { PeopleGraphComponent } from './people-graph/people-graph.component';
import { LinkVisualComponent } from './link-visual/link-visual.component';
import { NodeVisualComponent } from './node-visual/node-visual.component';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
  ],
  declarations: [ExpandableComponent, PeopleGraphComponent, LinkVisualComponent, NodeVisualComponent],
  exports: [],
  entryComponents: [],
})
export class ComponentsModule { }
