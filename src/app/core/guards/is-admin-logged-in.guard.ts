import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "~core/services";

@Injectable({
  providedIn: "root",
})
export class IsAdminLoggedInGuard implements CanActivate {
  constructor(private router: Router, private adminService: AdminService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const { isLoggedIn } = this.adminService;

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(["admin", "login"]);
      return false;
    }
  }
}
