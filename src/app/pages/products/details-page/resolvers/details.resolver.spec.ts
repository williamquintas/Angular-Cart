import { TestBed } from "@angular/core/testing";

import { ProductDetailsResolver } from "./details.resolver";

describe("ProductDetailsResolver", () => {
  let resolver: ProductDetailsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProductDetailsResolver);
  });

  xit("should be created", () => {
    expect(resolver).toBeTruthy();
  });
});
