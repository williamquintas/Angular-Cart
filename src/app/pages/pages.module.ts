import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharedModule } from "~shared/shared.module";

import { CartPage } from "./cart-page/cart-page.component";
import { ProductsItemComponent } from "./home-page/components/products/item/item.component";
import { ProductsListComponent } from "./home-page/components/products/list/list.component";
import { HomePage } from "./home-page/home-page.component";

@NgModule({
  declarations: [
    HomePage,
    CartPage,
    ProductsListComponent,
    ProductsItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
  ],
})
export class PagesModule {}
