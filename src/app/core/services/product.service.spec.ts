import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { IProduct, IProductQueryParameters } from "~shared/interfaces";

import { ProductService } from "./product.service";

describe("ProductService", () => {
  let service: ProductService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get a products list", () => {
    const mockedParameters: IProductQueryParameters = { page: 1, pageSize: 6 };
    const mockedResponse: IProduct[] = [];

    service.getAll(mockedParameters).subscribe((response) => {
      expect(response).toEqual({
        data: mockedResponse,
        totalCount: 0,
      });
    });

    const testRequest = httpController.expectOne(
      `/products?_page=${mockedParameters.page}&_limit=${mockedParameters.pageSize}`
    );
    expect(testRequest.request.method).toBe("GET");
    testRequest.flush(mockedResponse);
  });

  it("should get a product item", () => {
    const id = 1;

    const mockedItem: IProduct = {
      id: 1,
      title: "some_title",
      category: "some_category",
      description: "some_description",
      imageUrl: "some_image_url",
      unitPrice: 0.99,
    };

    service.get(id).subscribe((response) => {
      expect(response).toEqual({
        data: mockedItem,
      });
    });

    const testRequest = httpController.expectOne(`/products/${id}`);
    expect(testRequest.request.method).toBe("GET");
    testRequest.flush(mockedItem);
  });
});
