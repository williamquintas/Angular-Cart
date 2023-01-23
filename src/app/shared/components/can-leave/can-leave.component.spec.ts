import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanLeaveComponent } from './can-leave.component';

describe('CanLeaveComponent', () => {
  let component: CanLeaveComponent;
  let fixture: ComponentFixture<CanLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
