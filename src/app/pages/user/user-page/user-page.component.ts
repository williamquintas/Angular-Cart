import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { AuthenticationService, ErrorService } from "~core/services";
import { IUser } from "~shared/interfaces";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {
  isComponentDestroyed$ = new Subject<boolean>();
  isLoading$ = new Subject<boolean>();

  user!: IUser;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.authenticationService
      .getUser()
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe({
        next: (user) => {
          if (user) {
            this.user = user;
          }
        },
        error: (error) => {
          this.errorService.open(error);
        },
      });
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }

  logout() {
    this.isLoading$.next(true);
    this.authenticationService.logout();
    this.router.navigate(["user", "login"]);
    this.isLoading$.next(false);
  }
}
