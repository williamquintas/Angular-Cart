import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { combineLatest, Subject, takeUntil } from "rxjs";
import {
  CartService,
  CouponService,
  ErrorService,
  OrderService,
  ToastService,
} from "~core/services";
import { ICartItem, ICoupon, IOrder } from "~shared/interfaces";

@Component({
  selector: "app-cart-page",
  templateUrl: "./cart-page.component.html",
  styleUrls: ["./cart-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage {
  cartItems: ICartItem[] = [];
  appliedCoupons: ICoupon[] = [];
  isComponentDestroyed$ = new Subject<boolean>();

  couponField = new FormControl("", null);

  constructor(
    private router: Router,
    private cartService: CartService,
    private couponService: CouponService,
    private errorService: ErrorService,
    private orderService: OrderService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    combineLatest([this.cartService.getAll(), this.couponService.getAll()])
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe({
        next: ([cartItems, appliedCoupons]) => {
          this.cartItems = cartItems;
          this.appliedCoupons = appliedCoupons;
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

  updateQuantity(item: ICartItem, quantity: number) {
    try {
      this.cartService.update({ ...item, quantity });

      if (quantity === 0) {
        this.toastService.show(
          { body: "Item deleted" },
          {
            classname: "bg-danger text-light",
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  get totalItems() {
    return this.cartItems.reduce((itemsQuantity, item) => {
      return itemsQuantity + item.quantity;
    }, 0);
  }

  get subtotal(): number {
    return this.cartItems.reduce((currentSum, item) => {
      return (currentSum += item.unitPrice * item.quantity);
    }, 0);
  }

  get total(): number {
    const discountSum = this.appliedCoupons.reduce((discountSum, coupon) => {
      return discountSum + coupon.percentage;
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
    const coupon = this.couponField.value?.toLocaleUpperCase() ?? "";

    const couponError = this.couponService.applyCoupon(coupon);

    if (couponError) {
      this.couponField.setErrors({ [couponError]: true });
      this.toastService.show(
        { body: this.getFieldErrorMessage() },
        {
          classname: "bg-danger text-light",
        }
      );
    } else {
      this.couponField.setValue("");
      this.couponField.setErrors(null);

      this.toastService.show(
        {
          body: "Coupon applied",
        },
        { classname: "bg-success text-light" }
      );
    }
  }

  async addOrder() {
    const order: IOrder = {
      items: this.cartItems,
      coupons: this.appliedCoupons,
      total: this.total,
      subtotal: this.subtotal,
    };

    this.orderService.add(order);
    this.router.navigate(["cart", "checkout"]);
  }
}
