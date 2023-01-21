import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatSidenav } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ICartItems } from "src/app/shared/models/ICartItems";
import { CouponsService } from "~services/coupons.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent {
  @ViewChild("sidenav") cart!: MatSidenav;
  @Input() isCartOpened: boolean = false;
  @Input() items: ICartItems[] = [];
  @Output() shouldCloseCart = new EventEmitter<any>();

  couponField = new FormControl("", null);
  appliedCoupons: string[] = [];

  constructor(
    private couponsService: CouponsService,
    private _snackBar: MatSnackBar
  ) {}

  closeCart() {
    this.shouldCloseCart.emit();
  }

  updateQuantity(id: number, newQuantity: number) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    if (itemIndex >= 0) {
      if (newQuantity === 0) {
        this.items.splice(itemIndex, 1);
      } else {
        this.items[itemIndex].quantity = newQuantity;
      }
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

    return errorsKeys ? messages[errorsKeys[0]] : null;
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
