import { TestBed } from "@angular/core/testing";
import { skip } from "rxjs";

import { IOrder, PaymentMethod } from "~shared/interfaces";
import { OrderService } from "./order.service";

describe("OrderService", () => {
  const mockedItem: IOrder = { items: [], subtotal: 0, coupons: [], total: 0 };

  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
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
      .subscribe((orders) => {
        expect(orders).toEqual([{ ...mockedItem, id: 1 }]);
      });

    service.add(mockedItem);
  });

  it("should add payment method to item that exists on list", () => {
    const order = { ...mockedItem, id: 1 };
    service.add(mockedItem);

    service
      .getAll()
      .pipe(skip(1))
      .subscribe((orders) => {
        expect(orders[0].paymentMethod).toEqual(PaymentMethod.CASH);
      });

    service.addPaymentMethodToOrder(order, PaymentMethod.CASH);
  });

  it("should throw error when add payment to item that does not exist on list", () => {
    expect(() =>
      service.addPaymentMethodToOrder(mockedItem, PaymentMethod.CASH)
    ).toThrow(new Error("[OrdersService] Order not found"));
  });
});
