import { Component } from "@angular/core";
import { first, map, Subject, takeUntil } from "rxjs";
import { ErrorService, OrderService } from "~core/services";
import { IOrder, PaymentMethodLabels } from "~shared/interfaces";

@Component({
  selector: "app-confirmation-page",
  templateUrl: "./confirmation-page.component.html",
  styleUrls: ["./confirmation-page.component.scss"],
})
export class ConfirmationPage {
  isComponentDestroyed$ = new Subject<boolean>();

  PaymentMethodLabels: { [key: number]: string } = PaymentMethodLabels;

  order!: IOrder;

  constructor(
    private errorService: ErrorService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderService
      .getAll()
      .pipe(
        first(),
        takeUntil(this.isComponentDestroyed$),
        map((orders) => {
          const ordersList = [...orders];
          return ordersList.pop();
        })
      )
      .subscribe({
        next: (order) => {
          if (order) {
            this.order = order;
          }
        },
        error: (error) => {
          this.errorService.open(error);
        },
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
