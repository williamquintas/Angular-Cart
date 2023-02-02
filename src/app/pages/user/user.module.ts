import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { SharedModule } from "~shared/shared.module";

import { LoginPage } from "./login-page/login-page.component";
import { RoutingModule } from "./routing.module";
import { UserPage } from "./user-page/user-page.component";

@NgModule({
  declarations: [LoginPage, UserPage],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    RoutingModule,
  ],
})
export class UserModule {}
