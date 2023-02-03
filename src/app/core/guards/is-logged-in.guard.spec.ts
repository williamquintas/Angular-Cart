import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

import { AuthenticationService } from "~core/services";
import { IsLoggedInGuard } from "./is-logged-in.guard";

describe("IsLoggedInGuard", () => {
  let guard: IsLoggedInGuard;
  let authenticationService: AuthenticationService;
  let router = {
    navigate: jasmine.createSpy("navigate"),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        IsLoggedInGuard,
        AuthenticationService,
        { provide: Router, useValue: router },
      ],
    });
    guard = TestBed.inject(IsLoggedInGuard);
    authenticationService = TestBed.inject(AuthenticationService);
  });

  it("should continue when is authenticated", () => {
    const authenticationSpy = spyOnProperty(
      authenticationService,
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
      authenticationService,
      "isLoggedIn"
    ).and.returnValue(false);

    const result = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(result).toEqual(false);
    expect(authenticationSpy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(["user", "login"]);
  });
});
