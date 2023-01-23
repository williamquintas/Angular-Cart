import { Component } from "@angular/core";
import { IToast } from "~models/IToast";
import { ToastsService } from "~services/toasts.service";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent {
  toasts: IToast[] = [];

  constructor(private toastsService: ToastsService) {}

  ngOnInit() {
    this.toastsService.getAll().subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  remove(toast: IToast) {
    this.toastsService.remove(toast);
  }
}
