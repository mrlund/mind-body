import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreatWallComponent } from './great-wall.component';

describe('GreatWallComponent', () => {
  let component: GreatWallComponent;
  let fixture: ComponentFixture<GreatWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreatWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreatWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
