import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService, ErrorService } from "~core/services";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  form = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private errorService: ErrorService
  ) {}

  login() {
    this.authenticationService
      .login(this.form.getRawValue() as { username: string; password: string })
      .subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigate([""]);
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
