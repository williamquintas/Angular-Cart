import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CanDeactivateCartGuard, IsLoggedInGuard } from "~core/guards";
import storeConfig from "~shared/data/config.json";

import { CartPage } from "./cart-page/cart-page.component";
import { CheckoutPage } from "./checkout-page/checkout-page.component";
import { ConfirmationPage } from "./confirmation-page/confirmation-page.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: CartPage,
    title: `${storeConfig.name} | Cart`,
    canDeactivate: [CanDeactivateCartGuard],
  },
  {
    path: "checkout",
    component: CheckoutPage,
    title: `${storeConfig.name} | Checkout`,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: "confirmation",
    component: ConfirmationPage,
    title: `${storeConfig.name} | Confirmation`,
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
