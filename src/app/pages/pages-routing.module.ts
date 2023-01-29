import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

import { CanDeactivateCartGuard, IsLoggedInGuard } from "~core/guards";
import { CartPage } from "~pages/cart-page/cart-page.component";
import { CheckoutPage } from "~pages/checkout-page/checkout-page.component";
import { ConfirmationPage } from "~pages/confirmation-page/confirmation-page.component";
import storeConfig from "~shared/data/config.json";
import { LoginPage } from "./login-page/login-page.component";
import { UserPage } from "./user-page/user-page.component";

const routes: Routes = [
  {
    path: "products",
    loadChildren: () =>
      import("./product-details-page/product-details.module").then(
        (module) => module.ProductDetailsPageModule
      ),
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
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
