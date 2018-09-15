import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { D3Service } from '../services/d3.service';

@Directive({
  selector: '[giZoomableOf]'
})

export class ZoomableDirective implements OnInit {
  @Input('giZoomableOf') giZoomableOf: ElementRef;

  constructor(private d3Service: D3Service, private _element: ElementRef) { }

  ngOnInit() {
    this.d3Service.applyZoomableBehaviour(this.giZoomableOf, this._element.nativeElement);
  }
}
