import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "~core/core.module";
import { SharedModule } from "~shared/shared.module";
import { CartPage } from "./cart-page/cart-page.component";
import { CheckoutPage } from "./checkout-page/checkout-page.component";
import { ConfirmationPage } from "./confirmation-page/confirmation-page.component";
import { RoutingModule } from "./routing.module";

@NgModule({
  declarations: [CartPage, CheckoutPage, ConfirmationPage],
  imports: [
    CommonModule,
    CoreModule,
    RoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CartModule {}
