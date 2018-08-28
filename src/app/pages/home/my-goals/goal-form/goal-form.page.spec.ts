import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalFormPage } from './goal-form.page';

describe('GoalFormPage', () => {
  let component: GoalFormPage;
  let fixture: ComponentFixture<GoalFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
