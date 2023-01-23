import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { combineLatest, Subject, takeUntil } from "rxjs";
import { CartService } from "~services/cart.service";
import { CouponsService } from "~services/coupons.service";
import { OrdersService } from "~services/orders.service";
import { ToastsService } from "~services/toasts.service";
import { ICartItem } from "~shared/models/ICartItem";
import { ICoupon } from "../../shared/models/ICoupon";
import { IOrder } from "../../shared/models/IOrder";

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
    private ordersService: OrdersService,
    private couponsService: CouponsService,
    private toastsService: ToastsService
  ) {}

  ngOnInit() {
    combineLatest([this.cartService.getAll(), this.couponsService.getAll()])
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe(([cartItems, appliedCoupons]) => {
        this.cartItems = cartItems;
        this.appliedCoupons = appliedCoupons;
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

    const couponError = this.couponsService.applyCoupon(coupon);

    if (couponError) {
      this.couponField.setErrors({ [couponError]: true });
      this.toastsService.show(
        { body: this.getFieldErrorMessage() },
        {
          classname: "bg-danger text-light",
        }
      );
    } else {
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

  async addOrder() {
    const order: IOrder = {
      items: this.cartItems,
      coupons: this.appliedCoupons,
      total: this.total,
      subtotal: this.subtotal,
    };

    this.ordersService.add(order);
    this.router.navigate(["checkout"]);
  }
}
