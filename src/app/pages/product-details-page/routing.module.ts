import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import storeConfig from "~shared/data/config.json";
import { HomePage } from "../home-page/home-page.component";
import { ProductDetailsPage } from "./product-details-page.component";
import { ProductDetailsResolver } from "./product-details.resolver";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomePage,
    title: `${storeConfig.name}`,
  },
  {
    path: ":id",
    component: ProductDetailsPage,
    title: `${storeConfig.name} | Product Details`,
    resolve: {
      product: ProductDetailsResolver,
    },
  },
  {
    path: "**",
    redirectTo: "../products",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
