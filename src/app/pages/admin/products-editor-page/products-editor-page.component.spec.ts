import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ProductsEditorPage } from "./products-editor-page.component";

describe("ProductsEditorPage", () => {
  let component: ProductsEditorPage;
  let fixture: ComponentFixture<ProductsEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsEditorPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
