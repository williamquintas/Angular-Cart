import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductsListPage } from "./products-list-page.component";

describe("ProductsListPage", () => {
  let component: ProductsListPage;
  let fixture: ComponentFixture<ProductsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
