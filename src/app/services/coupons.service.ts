import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CouponsService {
  validateCoupon = (coupon: string) => {
    const validCoupons = ["DISCOUNT10", "DISCOUNT20", "DISCOUNT30"];
    return validCoupons.includes(coupon.toLocaleUpperCase());
  };
}
