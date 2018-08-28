import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreatWallItemComponent } from './great-wall-item.component';

describe('GreatWallItemComponent', () => {
  let component: GreatWallItemComponent;
  let fixture: ComponentFixture<GreatWallItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GreatWallItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreatWallItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
