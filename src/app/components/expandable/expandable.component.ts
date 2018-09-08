import { Component, Input, ViewChild, ElementRef, Renderer } from '@angular/core';
@Component({
  selector: 'gi-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss']
})
export class ExpandableComponent {
  @ViewChild('expandWrapper', { read: ElementRef }) expandWrapper;
  @Input('expanded') expanded;
  @Input('expandHeight') expandHeight;

  constructor(public renderer: Renderer) {

  }

  ngAfterViewInit() {
    this.renderer.setElementStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');
  }
}
