import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

import { AdminService } from "~core/services";
import { IsAdminLoggedInGuard } from "./is-admin-logged-in.guard";

describe("IsAdminLoggedInGuard", () => {
  let guard: IsAdminLoggedInGuard;
  let adminService: AdminService;
  let router = {
    navigate: jasmine.createSpy("navigate"),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        IsAdminLoggedInGuard,
        AdminService,
        { provide: Router, useValue: router },
      ],
    });
    guard = TestBed.inject(IsAdminLoggedInGuard);
    adminService = TestBed.inject(AdminService);
  });

  it("should continue when is authenticated", () => {
    const authenticationSpy = spyOnProperty(
      adminService,
      "isLoggedIn"
    ).and.returnValue(true);

    const result = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(result).toEqual(true);
    expect(authenticationSpy).toHaveBeenCalled();
  });

  it("should be blocked when is not authenticated", () => {
    const authenticationSpy = spyOnProperty(
      adminService,
      "isLoggedIn"
    ).and.returnValue(false);

    const result = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(result).toEqual(false);
    expect(authenticationSpy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(["admin", "login"]);
  });
});
