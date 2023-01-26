import { Component } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { AuthenticationService, ErrorService } from "~core/services";
import storeConfig from "~shared/data/config.json";
import { IUser } from "~shared/interfaces";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  isComponentDestroyed$ = new Subject<boolean>();
  name = storeConfig.name ?? "Store";
  icon = storeConfig.icon ?? "bi-shop";

  isMenuCollapsed = true;
  user!: IUser | null;

  constructor(
    private authenticationService: AuthenticationService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.authenticationService
      .getUser()
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe({
        next: (user) => {
          this.user = user;
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
}
