import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalProgressPage } from './goal-progress.page';

describe('GoalProgressPage', () => {
  let component: GoalProgressPage;
  let fixture: ComponentFixture<GoalProgressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalProgressPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalProgressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
