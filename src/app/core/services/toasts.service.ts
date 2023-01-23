import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IToast } from "~shared/models/IToast";

@Injectable({
  providedIn: "root",
})
export class ToastsService {
  private toasts: IToast[] = [];
  toasts$ = new BehaviorSubject<IToast[]>(this.toasts);

  constructor() {}

  show(toast: IToast, options?: { classname: string }) {
    this.toasts.push({ ...toast, ...options });
    this.toasts$.next(this.toasts);
  }

  getAll() {
    return this.toasts$;
  }

  remove(toastToRemove: IToast) {
    this.toasts = this.toasts.filter((toast) => toast !== toastToRemove);
  }
}
