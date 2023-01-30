import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { mergeMap, Observable } from "rxjs";
import { CartService } from "~core/services";
import { CanLeaveModal } from "~shared/components/can-leave/can-leave.component";
import { ICartItem } from "~shared/interfaces";

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
      isLeavingCartFlow = nextState?.url !== "/cart/checkout";

    return isLeavingCartFlow
      ? cartItemsList$.pipe(
          mergeMap(async (cartItemsList: ICartItem[]) =>
            cartItemsList.length > 0
              ? await this.modalService.open(CanLeaveModal).result
              : true
          )
        )
      : true;
  }
}
