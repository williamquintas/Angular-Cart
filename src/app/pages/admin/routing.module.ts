import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import storeConfig from "~shared/data/config.json";
import { IsAdminLoggedInGuard } from "../../core/guards";

import { AdminPage } from "./admin-page/admin-page.component";
import { LoginPage } from "./login-page/login-page.component";
import { ProductsEditorPage } from "./products-editor-page/products-editor-page.component";
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
    pathMatch: "full",
    component: ProductsListPage,
    title: `${storeConfig.name} | Products Management`,
  },

  {
    path: "products/add",
    pathMatch: "full",
    component: ProductsEditorPage,
    title: `${storeConfig.name} | Create product`,
  },
  {
    path: "products/:id",
    component: ProductsEditorPage,
    title: `${storeConfig.name} | Create product`,
  },
  {
    path: "users",
    component: UsersListPage,
    title: `${storeConfig.name} | Users Management`,
  },
  {
    path: "**",
    redirectTo: "login",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
