import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CartPage } from "./cart-page.component";

describe("CartPageComponent", () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should be created", () => {
    expect(component).toBeTruthy();
  });
});
