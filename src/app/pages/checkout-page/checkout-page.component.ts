import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first, map, Subject, takeUntil } from "rxjs";
import { IOrder, PaymentMethod, PaymentMethodLabels } from "~models/IOrder";
import { OrdersService } from "~services/orders.service";
import { ToastsService } from "~services/toasts.service";

@Component({
  selector: "app-checkout-page",
  templateUrl: "./checkout-page.component.html",
  styleUrls: ["./checkout-page.component.scss"],
})
export class CheckoutPage {
  isComponentDestroyed$ = new Subject<boolean>();

  PaymentMethod = PaymentMethod;
  PaymentMethodLabels: { [key: number]: string } = PaymentMethodLabels;

  order: IOrder | undefined;

  paymentMethodField = new FormControl(null, [Validators.required]);
  paymentMethodOptions = Object.values(PaymentMethod)
    .filter((key) => !isNaN(Number(key)))
    .map((key) => Number(key));

  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private toastsService: ToastsService
  ) {}

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
        this.order = order;
      });
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  getFieldErrorMessage() {
    const { errors } = this.paymentMethodField;
    const errorsKeys = Object.keys(errors as Object);

    const messages: { [key: string]: string } = {
      required: "Please select a payment method",
    };

    return errorsKeys ? messages[errorsKeys[0]] : "";
  }

  finishOrder() {
    if (this.paymentMethodField.invalid) {
      this.toastsService.show(
        { body: this.getFieldErrorMessage() },
        { classname: "bg-danger text-light" }
      );
    }
    if (
      this.order &&
      this.paymentMethodField.valid &&
      this.paymentMethodField.value
    ) {
      this.ordersService.addPaymentMethodToOrder(
        this.order,
        this.paymentMethodField.value as PaymentMethod
      );
      this.router.navigate(["confirmation"]);
    }
  }
}
