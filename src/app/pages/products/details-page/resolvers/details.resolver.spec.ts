import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { ActivatedRouteSnapshot } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { ProductService } from "~core/services";
import { IProduct } from "~shared/interfaces";

import { ProductDetailsResolver } from "./details.resolver";

describe("ProductDetailsResolver", () => {
  let resolver: ProductDetailsResolver;
  let service: ProductService;
  let activatedRoute: ActivatedRouteSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      providers: [
        ProductDetailsResolver,
        {
          provide: ActivatedRouteSnapshot,
          useValue: { params: {} },
        },
      ],
    });
    activatedRoute = TestBed.inject(ActivatedRouteSnapshot);
    resolver = TestBed.inject(ProductDetailsResolver);
    service = TestBed.inject(ProductService);
  });

  it("should resolve a product using the product service", () => {
    const mockedItem: IProduct = {
      id: 1,
      title: "some_title",
      category: "some_category",
      description: "some_description",
      imageUrl: "some_image_url",
      unitPrice: 0.99,
    };

    spyOn(service, "get").and.returnValue(of({ data: mockedItem }));

    activatedRoute.params = { id: mockedItem.id };

    resolver.resolve(activatedRoute).subscribe((product) => {
      if (product) {
        expect(product).toEqual(mockedItem);
      }
    });
    expect(service.get).toHaveBeenCalledWith(mockedItem.id);
  });

  it("should not resolve when don't have id", () => {
    activatedRoute.params = {};

    resolver.resolve(activatedRoute).subscribe((response) => {
      expect(response).toBeNull();
    });
  });
});
