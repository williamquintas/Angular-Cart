import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { CanLeaveModal } from "~shared/components/can-leave/can-leave.component";

@Injectable({
  providedIn: "root",
})
export class CanDeactivateCartGuard implements CanDeactivate<CanLeaveModal> {
  constructor(private modalService: NgbModal) {}

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
    if (nextState?.url !== "/checkout") {
      const modal = this.modalService.open(CanLeaveModal);
      return modal.result;
    } else {
      return true;
    }
  }
}
