import { TestBed } from "@angular/core/testing";
import { skip } from "rxjs";

import { CartService } from "./cart.service";

describe("CartService", () => {
  let service: CartService;
  const mockedItem = {
    id: 1,
    title: "some_title",
    category: "some_category",
    description: "some_description",
    imageUrl: "some_image_url",
    unitPrice: 0.99,
    quantity: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CartService] });
    service = TestBed.inject(CartService);
  });

  it("should return empty list", () => {
    service.getAll().subscribe((items) => {
      expect(items).toEqual([]);
    });
  });

  it("should add item that does not exist on list", () => {
    service
      .getAll()
      .pipe(skip(1))
      .subscribe((items) => {
        expect(items).toEqual([mockedItem]);
      });

    service.add(mockedItem);
  });

  it("should update item quantity when it that already exists on list", () => {
    service.add(mockedItem);

    service
      .getAll()
      .pipe(skip(1))
      .subscribe((items) => {
        expect(items).toEqual([mockedItem]);
        expect(items[0].quantity).toEqual(2);
      });

    service.add(mockedItem);
  });

  it("should get empty list after clearing it", () => {
    service.add(mockedItem);

    service
      .getAll()
      .pipe(skip(1))
      .subscribe((items) => {
        expect(items).toEqual([]);
      });

    service.clear();
  });

  it("should remove item from list when updating it with quantity equal to zero", () => {
    service.add(mockedItem);

    service
      .getAll()
      .pipe(skip(1))
      .subscribe((items) => {
        expect(items).toEqual([]);
      });

    service.update({ ...mockedItem, quantity: 0 });
  });

  it("should throw error when does not found item while updating", () => {
    expect(() => service.update(mockedItem)).toThrow(
      new Error("[CartService] Item not found")
    );
  });

  it("should successfully update item on list", () => {
    service.add(mockedItem);

    service
      .getAll()
      .pipe(skip(1))
      .subscribe((items) => {
        expect(items).toEqual([{ ...mockedItem, quantity: 2 }]);
      });

    service.update({ ...mockedItem, quantity: 2 });
  });
});
