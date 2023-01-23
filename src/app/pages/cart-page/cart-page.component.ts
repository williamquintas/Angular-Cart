import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { first, Subject, takeUntil } from "rxjs";
import { CartService } from "~services/cart.service";
import { CouponsService } from "~services/coupons.service";
import { OrdersService } from "~services/orders.service";
import { ToastsService } from "~services/toasts.service";
import { ICartItem } from "~shared/models/ICartItem";
import { IOrder } from "../../shared/models/IOrder";

@Component({
  selector: "app-cart-page",
  templateUrl: "./cart-page.component.html",
  styleUrls: ["./cart-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage {
  items: ICartItem[] = [];
  appliedCoupons: string[] = [];
  isComponentDestroyed$ = new Subject<boolean>();

  couponField = new FormControl("", null);

  constructor(
    private router: Router,
    private cartService: CartService,
    private ordersService: OrdersService,
    private couponsService: CouponsService,
    private toastsService: ToastsService
  ) {}

  ngOnInit() {
    this.cartService
      .getAll()
      .pipe(takeUntil(this.isComponentDestroyed$), first())
      .subscribe((items) => {
        this.items = items;
      });
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  updateQuantity(item: ICartItem, quantity: number) {
    try {
      this.cartService.update({ ...item, quantity });

      if (quantity === 0) {
        this.toastsService.show(
          { body: "Item deleted" },
          {
            classname: "bg-warn text-light",
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  get totalItems() {
    return this.items.reduce((itemsQuantity, item) => {
      return itemsQuantity + item.quantity;
    }, 0);
  }

  get subtotal(): number {
    return this.items.reduce((currentSum, item) => {
      return (currentSum += item.unitPrice * item.quantity);
    }, 0);
  }

  get total(): number {
    const discountSum = this.appliedCoupons.reduce((discountSum, coupon) => {
      const discount: string = coupon.slice(-2);
      return discountSum + Number(discount);
    }, 0);
    const percentageDiscount = (100 - discountSum) / 100;

    return this.subtotal * percentageDiscount;
  }

  getFieldErrorMessage() {
    const { errors } = this.couponField;
    const errorsKeys = Object.keys(errors as Object);

    const messages: { [key: string]: string } = {
      isCouponAlreadyApplied: "This coupon is already applied!",
      isCouponInvalid: "This coupon is invalid!",
    };

    return errorsKeys ? messages[errorsKeys[0]] : "";
  }

  validateCoupon() {
    const coupon = this.couponField.value ?? "";
    const isCouponAlreadyApplied = this.appliedCoupons.includes(coupon);

    if (isCouponAlreadyApplied) {
      this.couponField.setErrors({ isCouponAlreadyApplied: true });

      this.toastsService.show(
        { body: this.getFieldErrorMessage() },
        {
          classname: "bg-danger text-light",
        }
      );
    } else {
      const isCouponValid = this.couponsService.validateCoupon(coupon);

      if (!isCouponValid) {
        this.couponField.setErrors({ isCouponInvalid: true });
        this.toastsService.show(
          { body: this.getFieldErrorMessage() },
          {
            classname: "bg-danger text-light",
          }
        );
      } else {
        this.appliedCoupons.push(coupon);

        this.couponField.setValue("");
        this.couponField.setErrors(null);

        this.toastsService.show(
          {
            body: "Coupon applied",
          },
          { classname: "bg-success text-light" }
        );
      }
    }
  }

  async addOrder() {
    const order: IOrder = {
      items: this.items,
      coupons: [],
      total: this.total,
      subtotal: this.subtotal,
    };

    this.ordersService.add(order);
    this.cartService.clear();
    this.router.navigate(["checkout"]);
  }
}
