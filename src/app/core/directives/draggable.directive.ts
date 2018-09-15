import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Node, ForceDirectedGraph } from '../models';
import { D3Service } from '../services/d3.service';

@Directive({
  selector: '[giDraggableNode]'
})
export class DraggableDirective implements OnInit {
  @Input('giDraggableNode') giDraggableNode: Node;
  @Input('giDraggableInGraph') giDraggableInGraph: ForceDirectedGraph;

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyDraggableBehaviour(this._element.nativeElement, this.giDraggableNode, this.giDraggableInGraph);
  }
}