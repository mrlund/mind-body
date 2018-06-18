import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMoodComponent } from './my-mood.component';

describe('MyMoodComponent', () => {
  let component: MyMoodComponent;
  let fixture: ComponentFixture<MyMoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
