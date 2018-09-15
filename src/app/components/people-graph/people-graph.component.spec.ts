import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleGraphComponent } from './people-graph.component';

describe('PeopleGraphComponent', () => {
  let component: PeopleGraphComponent;
  let fixture: ComponentFixture<PeopleGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
