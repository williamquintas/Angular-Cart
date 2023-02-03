import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthenticationService, ErrorService } from "~core/services";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  isLoading$ = new Subject<boolean>();
  form = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private errorService: ErrorService
  ) {}

  login() {
    this.isLoading$.next(true);
    this.authenticationService
      .login(this.form.getRawValue() as { username: string; password: string })
      .subscribe({
        next: (isAuthenticated) => {
          if (isAuthenticated) {
            this.router.navigate([""]);
          }
          this.isLoading$.next(false);
        },
        error: (error: any) => {
          if (error.status === 400) {
            error.name = "Error on Login";
          }

          this.errorService.open(error);
          this.form.reset();
          this.isLoading$.next(false);
        },
      });
  }
}
