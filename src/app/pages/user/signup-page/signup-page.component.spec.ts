import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SignupPage } from "./signup-page.component";

describe("SignupPage", () => {
  let component: SignupPage;
  let fixture: ComponentFixture<SignupPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
