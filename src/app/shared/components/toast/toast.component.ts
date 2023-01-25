import { Component } from "@angular/core";
import { ToastService } from "~core/services";
import { IToast } from "~shared/interfaces";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent {
  toasts: IToast[] = [];

  constructor(private ToastService: ToastService) {}

  ngOnInit() {
    this.ToastService.getAll().subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  remove(toast: IToast) {
    this.ToastService.remove(toast);
  }
}
