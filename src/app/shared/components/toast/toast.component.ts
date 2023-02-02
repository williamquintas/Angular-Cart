import { Component } from "@angular/core";
import { ErrorService, ToastService } from "~core/services";
import { IToast } from "~shared/interfaces";

@Component({
  selector: "app-toast",
  templateUrl: "./toast.component.html",
  styleUrls: ["./toast.component.scss"],
})
export class ToastComponent {
  toasts: IToast[] = [];

  constructor(
    private toastService: ToastService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.toastService.getAll().subscribe({
      next: (toasts) => {
        this.toasts = toasts;
      },
      error: (error) => {
        this.errorService.open(error);
      },
    });
  }

  remove(toast: IToast) {
    this.toastService.remove(toast);
  }
}
