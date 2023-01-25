import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "~shared/shared.module";
import { PagesRoutingModule } from "./pages-routing.module";

import { CartPage } from "./cart-page/cart-page.component";
import { CheckoutPage } from "./checkout-page/checkout-page.component";
import { ConfirmationPage } from "./confirmation-page/confirmation-page.component";
import { ProductsItemComponent } from "./home-page/components/products/item/item.component";
import { ProductsListComponent } from "./home-page/components/products/list/list.component";
import { HomePage } from "./home-page/home-page.component";
import { LoginPage } from "./login-page/login-page.component";
import { PagesComponent } from "./pages.component";
import { UserPage } from "./user-page/user-page.component";

@NgModule({
  declarations: [
    HomePage,
    CartPage,
    CheckoutPage,
    ConfirmationPage,
    UserPage,
    ProductsListComponent,
    ProductsItemComponent,
    LoginPage,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    PagesRoutingModule,
  ],
  exports: [PagesComponent],
})
export class PagesModule {}
