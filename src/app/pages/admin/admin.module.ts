import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "../../shared/shared.module";
import { AdminPage } from "./admin-page/admin-page.component";
import { LoginPage } from "./login-page/login-page.component";
import { ProductsEditorPage } from "./products-editor-page/products-editor-page.component";
import { ProductsListPage } from "./products-list-page/products-list-page.component";
import { RoutingModule } from "./routing.module";

@NgModule({
  declarations: [AdminPage, LoginPage, ProductsListPage, ProductsEditorPage],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTooltipModule,
    RoutingModule,
  ],
})
export class AdminModule {}
