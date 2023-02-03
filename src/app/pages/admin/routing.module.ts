import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import storeConfig from "~shared/data/config.json";
import { IsAdminLoggedInGuard } from "../../core/guards";

import { AdminPage } from "./admin-page/admin-page.component";
import { LoginPage } from "./login-page/login-page.component";
import { ProductsListPage } from "./products-list-page/products-list-page.component";
import { UsersListPage } from "./users-list-page/users-list-page.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: AdminPage,
    title: `${storeConfig.name} | Admin Page`,
    canActivate: [IsAdminLoggedInGuard],
  },
  {
    path: "login",
    component: LoginPage,
    title: `${storeConfig.name} | Admin Login`,
  },
  {
    path: "products",
    component: ProductsListPage,
    title: `${storeConfig.name} | Products Management`,
  },
  {
    path: "users",
    component: UsersListPage,
    title: `${storeConfig.name} | Users Management`,
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
