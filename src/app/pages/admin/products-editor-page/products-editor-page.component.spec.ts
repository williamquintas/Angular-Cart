import { HttpClientModule } from "@angular/common/http";
import { async, TestBed } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";

import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { ProductService } from "~core/services";
import { IProduct } from "~shared/interfaces";
import { ProductsEditorPage } from "./products-editor-page.component";

const mockedProduct: IProduct = {
  id: 8,
  title: "Saturday Night Fever",
  category: "Others",
  description: "Bee Gees | 1977",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/en/0/0c/TheBeeGeesSaturdayNightFeveralbumcover.jpg",
  unitPrice: 22.19,
};

describe("ProductsEditorPage", () => {
  let component: ProductsEditorPage;
  let service: ProductService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let formBuilder: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      providers: [
        ProductsEditorPage,
        ProductService,
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: { params: of({}) },
        },
      ],
    });
    component = TestBed.inject(ProductsEditorPage);
    service = TestBed.inject(ProductService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    formBuilder = TestBed.inject(FormBuilder);
  }));

  it("should retrieve product by id from route", () => {
    const { id, ...product } = mockedProduct;
    spyOn(formBuilder, "group").and.callThrough();
    spyOn(service, "get").and.returnValue(
      of({
        data: mockedProduct,
      })
    );
    activatedRoute.params = of({ id: 8 });

    component.ngOnInit();

    expect(component.form.value).toEqual(product);
  });

  it("should create product", () => {
    const { id, ...product } = mockedProduct;
    spyOn(formBuilder, "group").and.callThrough();
    spyOn(service, "create").and.returnValue(of(undefined));
    spyOn(router, "navigate").and.returnValue(Promise.resolve(true));

    component.ngOnInit();
    component.form.setValue(product);
    component.saveProduct();

    expect(service.create).toHaveBeenCalledWith(product as IProduct);
    expect(router.navigate).toHaveBeenCalledWith(["admin", "products"]);
  });
});
