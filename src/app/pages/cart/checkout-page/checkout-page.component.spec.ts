import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CheckoutPage } from "./checkout-page.component";

describe("CheckoutPageComponent", () => {
  let component: CheckoutPage;
  let fixture: ComponentFixture<CheckoutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
