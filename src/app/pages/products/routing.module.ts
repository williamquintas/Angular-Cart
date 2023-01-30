import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import storeConfig from "~shared/data/config.json";

import { HomePage } from "~pages/home-page/home-page.component";
import { DetailsPage } from "./details-page/details-page.component";
import { ProductDetailsResolver } from "./details-page/resolvers";
import { ListPage } from "./list-page/list-page.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: HomePage,
    title: storeConfig.name,
  },
  {
    path: "list",
    pathMatch: "full",
    component: ListPage,
    title: `${storeConfig.name} | List`,
  },
  {
    path: ":id",
    component: DetailsPage,
    title: `${storeConfig.name} | Product Details`,
    resolve: {
      product: ProductDetailsResolver,
    },
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
