import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ICoupon } from "~models/ICoupon";

const VALID_COUPONS: ICoupon[] = [
  { text: "DISCOUNT10", percentage: 10 },
  { text: "DISCOUNT20", percentage: 20 },
  { text: "DISCOUNT30", percentage: 30 },
];

@Injectable({
  providedIn: "root",
})
export class CouponsService {
  private appliedCoupons: ICoupon[] = [];
  appliedCoupons$ = new BehaviorSubject<ICoupon[]>([]);

  getAll() {
    return this.appliedCoupons$;
  }

  applyCoupon = (coupon: string): string | void => {
    const isCouponInvalid =
      VALID_COUPONS.findIndex(({ text }) => text === coupon) < 0;
    const isCouponAlreadyApplied = this.appliedCoupons.find(
      ({ text }) => text === coupon
    );

    if (isCouponInvalid) {
      return "isCouponInvalid";
    } else if (isCouponAlreadyApplied) {
      return "isCouponAlreadyApplied";
    } else {
      const foundCoupon = VALID_COUPONS.find(({ text }) => text === coupon);

      if (foundCoupon) {
        this.appliedCoupons.push(foundCoupon);
        this.appliedCoupons$.next(this.appliedCoupons);
      }
    }
  };
}
