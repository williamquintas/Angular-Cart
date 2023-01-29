import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductDetailsPage } from "./product-details-page.component";

describe("ProductDetailsPageComponent", () => {
  let component: ProductDetailsPage;
  let fixture: ComponentFixture<ProductDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
