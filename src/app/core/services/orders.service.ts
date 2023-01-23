import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IOrder, PaymentMethod } from "~models/IOrder";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private orders: IOrder[] = [];
  orders$ = new BehaviorSubject<IOrder[]>([]);

  constructor() {}

  add(order: IOrder) {
    this.orders.push({
      ...order,
      id: this.orders.length + 1,
    });
    this.orders$.next(this.orders);
  }

  addPaymentMethodToOrder(order: IOrder, method: PaymentMethod) {
    const orderIndex = this.orders.findIndex(({ id }) => id === order.id);

    if (orderIndex < 0) {
      throw new Error("[OrdersService] Order not found");
    } else {
      this.orders[orderIndex].paymentMethod = method;
    }

    this.orders$.next(this.orders);
  }

  getAll(): Observable<IOrder[]> {
    return this.orders$;
  }
}
