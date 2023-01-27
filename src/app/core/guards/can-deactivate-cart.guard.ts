import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { mergeMap, Observable } from "rxjs";
import { CanLeaveModal } from "~shared/components/can-leave/can-leave.component";
import { CartService } from "../services";

@Injectable({
  providedIn: "root",
})
export class CanDeactivateCartGuard implements CanDeactivate<CanLeaveModal> {
  constructor(
    private cartService: CartService,
    private modalService: NgbModal
  ) {}

  canDeactivate(
    component: CanLeaveModal,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const cartItemsList$ = this.cartService.getAll(),
      isLeavingCartFlow = nextState?.url !== "/checkout";

    return isLeavingCartFlow
      ? cartItemsList$.pipe(
          mergeMap(async (cartItemsList) =>
            cartItemsList.length > 0
              ? await this.modalService.open(CanLeaveModal).result
              : true
          )
        )
      : true;
  }
}
