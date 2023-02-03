import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../shared/shared.module";
import { AdminPage } from "./admin-page/admin-page.component";
import { LoginPage } from "./login-page/login-page.component";
import { ProductsListPage } from "./products-list-page/products-list-page.component";
import { RoutingModule } from "./routing.module";

@NgModule({
  declarations: [AdminPage, LoginPage, ProductsListPage],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    RoutingModule,
  ],
})
export class AdminModule {}
