import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject, takeUntil } from "rxjs";
import { ICartItems } from "src/app/shared/models/ICartItems";
import { CouponsService } from "~services/coupons.service";
import { CartService } from "../../core/services/cart.service";

@Component({
  selector: "app-cart-page",
  templateUrl: "./cart-page.component.html",
  styleUrls: ["./cart-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage {
  items: ICartItems[] = [];
  appliedCoupons: string[] = [];
  componentDestroyed$ = new Subject<boolean>();

  couponField = new FormControl("", null);

  constructor(
    private cartService: CartService,
    private couponsService: CouponsService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cartService
      .getAll()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((items) => {
        this.items = items;
      });
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  updateQuantity(item: ICartItems, quantity: number) {
    try {
      this.cartService.update({ ...item, quantity });
    } catch (error) {
      console.error(error);
    }
  }

  get totalItems() {
    return this.items.reduce((itemsQuantity, item) => {
      return itemsQuantity + item.quantity;
    }, 0);
  }

  get subtotal(): string {
    return Number(
      this.items.reduce((currentSum, item) => {
        return (currentSum += item.unitPrice * item.quantity);
      }, 0)
    ).toFixed(2);
  }

  get total(): string {
    const discountSum = this.appliedCoupons.reduce((discountSum, coupon) => {
      const discount: string = coupon.slice(-2);
      return discountSum + Number(discount);
    }, 0);

    return Number(
      (this.items.reduce((currentSum, item) => {
        return (currentSum += item.unitPrice * item.quantity);
      }, 0) *
        (100 - discountSum)) /
        100
    ).toFixed(2);
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
    } else {
      const isCouponValid = this.couponsService.validateCoupon(coupon);

      if (!isCouponValid) {
        this.couponField.setErrors({ isCouponInvalid: true });
      } else {
        this.appliedCoupons.push(coupon);

        this.couponField.setValue("");
        this.couponField.setErrors(null);

        this._snackBar.open("Coupon applied!", "Dismiss", {
          horizontalPosition: "right",
          verticalPosition: "top",
          duration: 2000,
        });
      }
    }
  }

  finishOrder() {
    this.items.splice(0, this.items.length);
    this.appliedCoupons.splice(0, this.appliedCoupons.length);

    this._snackBar.open("Your order will be sent soon!", "Dismiss", {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 2000,
    });
  }
}
