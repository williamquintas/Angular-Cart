import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AdminService } from "../../../core/services";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.scss"],
})
export class AdminPage {
  isLoading$ = new Subject<boolean>();

  constructor(private adminService: AdminService, private router: Router) {}

  logout() {
    this.isLoading$.next(true);
    this.adminService.logout();
    this.router.navigate(["admin", "login"]);
    this.isLoading$.next(false);
  }
}
