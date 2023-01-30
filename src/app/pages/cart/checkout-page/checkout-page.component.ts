import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first, map, Subject, takeUntil } from "rxjs";
import {
  CartService,
  ErrorService,
  OrderService,
  ToastService,
} from "~core/services";
import { IOrder, PaymentMethod, PaymentMethodLabels } from "~shared/interfaces";

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
    private cartService: CartService,
    private errorService: ErrorService,
    private orderService: OrderService,
    private toastService: ToastService
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
          this.order = order;
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
      this.toastService.show(
        { body: this.getFieldErrorMessage() },
        { classname: "bg-danger text-light" }
      );
    }
    if (
      this.order &&
      this.paymentMethodField.valid &&
      this.paymentMethodField.value
    ) {
      this.orderService.addPaymentMethodToOrder(
        this.order,
        this.paymentMethodField.value as PaymentMethod
      );
      this.cartService.clear();
      this.router.navigate(["cart", "confirmation"]);
    }
  }
}
