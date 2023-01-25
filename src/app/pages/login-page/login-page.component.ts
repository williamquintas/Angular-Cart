import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "~core/services";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  login() {
    this.authenticationService.login();
    this.router.navigate([""]);
  }
}
