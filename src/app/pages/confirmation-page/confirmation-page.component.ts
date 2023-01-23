import { Component } from "@angular/core";
import { first, map, Subject, takeUntil } from "rxjs";
import { OrdersService } from "~services/orders.service";
import { IOrder, PaymentMethodLabels } from "~shared/models/IOrder";

@Component({
  selector: "app-confirmation-page",
  templateUrl: "./confirmation-page.component.html",
  styleUrls: ["./confirmation-page.component.scss"],
})
export class ConfirmationPage {
  isComponentDestroyed$ = new Subject<boolean>();

  PaymentMethodLabels: { [key: number]: string } = PaymentMethodLabels;

  order!: IOrder;

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.ordersService
      .getAll()
      .pipe(
        first(),
        takeUntil(this.isComponentDestroyed$),
        map((orders) => {
          const ordersList = [...orders];
          return ordersList.pop();
        })
      )
      .subscribe((order) => {
        if (order) {
          this.order = order;
        }
      });
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  get discountPercentage() {
    const { coupons } = this.order;
    const discountSum = coupons.reduce((discountSum, coupon) => {
      return discountSum + coupon.percentage;
    }, 0);

    return discountSum;
  }
}
