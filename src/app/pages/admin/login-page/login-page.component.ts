import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminService, ErrorService } from "~core/services";

@Component({
  selector: "app-admin-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  form = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private router: Router,
    private adminService: AdminService,
    private errorService: ErrorService
  ) {}

  login() {
    this.adminService
      .login(this.form.getRawValue() as { username: string; password: string })
      .subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigate(["admin"]);
          }
        },
        error: (error: any) => {
          if (error.status === 400) {
            error.name = "Error on Login";
          }

          this.errorService.open(error);
        },
      });
  }
}
