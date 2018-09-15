import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GwwGraphComponent } from './gww-graph.component';

describe('GwwGraphComponent', () => {
  let component: GwwGraphComponent;
  let fixture: ComponentFixture<GwwGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GwwGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GwwGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
