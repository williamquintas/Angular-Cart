import { TestBed } from "@angular/core/testing";
import { skip } from "rxjs";

import { CouponService } from "./coupon.service";

describe("CouponService", () => {
  let service: CouponService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should apply a valid coupon", () => {
    const validCoupon = "DISCOUNT10";

    service
      .getAll()
      .pipe(skip(1))
      .subscribe((appliedCoupons) => {
        expect(appliedCoupons.length).toBeGreaterThan(0);
      });

    service.applyCoupon(validCoupon);
  });

  it("should not apply a not found coupon", () => {
    service
      .getAll()
      .pipe(skip(1))
      .subscribe((appliedCoupons) => {
        expect(appliedCoupons.length).toBe(0);
      });

    const error = service.applyCoupon("INVALID_COUPON");

    expect(error).toBe("isCouponInvalid");
  });

  it("should not apply an already applied coupon", () => {
    const validCoupon = "DISCOUNT10";
    service.applyCoupon(validCoupon);

    const error = service.applyCoupon(validCoupon);
    expect(error).toBe("isCouponAlreadyApplied");
  });
});
