import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePage } from "~pages/home-page/home-page.component";
import storeConfig from "~shared/data/config.json";
import { CartPage } from "./pages/cart-page/cart-page.component";

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
