import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IsLoggedInGuard } from "~core/guards/is-logged-in.guard";
import { CanDeactivateCartGuard } from "~guards/can-deactivate-cart.guard";
import { CartPage } from "~pages/cart-page/cart-page.component";
import { CheckoutPage } from "~pages/checkout-page/checkout-page.component";
import { ConfirmationPage } from "~pages/confirmation-page/confirmation-page.component";
import { HomePage } from "~pages/home-page/home-page.component";
import storeConfig from "~shared/data/config.json";
import { LoginPage } from "./pages/login-page/login-page.component";
import { UserPage } from "./pages/user-page/user-page.component";

const routes: Routes = [
  {
    path: "products",
    component: HomePage,
    title: storeConfig.name,
  },
  {
    path: "cart",
    component: CartPage,
    title: `${storeConfig.name} | Cart`,
    canDeactivate: [CanDeactivateCartGuard],
  },
  {
    path: "checkout",
    component: CheckoutPage,
    title: `${storeConfig.name} | Checkout`,
  },
  {
    path: "confirmation",
    component: ConfirmationPage,
    title: `${storeConfig.name} | Confirmation`,
  },
  {
    path: "user",
    component: UserPage,
    title: `${storeConfig.name} | My Account`,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: "login",
    component: LoginPage,
    title: `${storeConfig.name} | Login`,
  },
  { path: "", redirectTo: "products", pathMatch: "full" },
  {
    path: "**",
    redirectTo: "products",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
