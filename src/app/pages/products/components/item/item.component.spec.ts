import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProductsItemComponent } from "./item.component";

describe("ItemComponent", () => {
  let component: ProductsItemComponent;
  let fixture: ComponentFixture<ProductsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit("should be created", () => {
    expect(component).toBeTruthy();
  });
});
