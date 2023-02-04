import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "~core/services";

@Injectable({
  providedIn: "root",
})
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { isLoggedIn } = this.authenticationService;

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(["user", "login"], {
        queryParams: { redirectTo: state.url },
      });
      return false;
    }
  }
}
