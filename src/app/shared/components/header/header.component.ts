import { Component } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { IUser } from "~models/IUser";
import { AuthenticationService } from "~services/authentication.service";
import storeConfig from "~shared/data/config.json";

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

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService
      .getUser()
      .pipe(takeUntil(this.isComponentDestroyed$))
      .subscribe((user) => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.isComponentDestroyed$.next(true);
    this.isComponentDestroyed$.complete();
  }
}
