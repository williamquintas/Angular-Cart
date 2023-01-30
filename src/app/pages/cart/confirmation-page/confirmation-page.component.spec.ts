import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfirmationPage } from "./confirmation-page.component";

describe("ConfirmationPageComponent", () => {
  let component: ConfirmationPage;
  let fixture: ComponentFixture<ConfirmationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
