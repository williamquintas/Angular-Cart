import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CanLeaveModal } from "./can-leave.component";

describe("CanLeaveModal", () => {
  let component: CanLeaveModal;
  let fixture: ComponentFixture<CanLeaveModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanLeaveModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CanLeaveModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
