import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import storeConfig from "~shared/data/config.json";
import { IsAdminLoggedInGuard } from "../../core/guards";

import { AdminPage } from "./admin-page/admin-page.component";
import { LoginPage } from "./login-page/login-page.component";

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
    path: "**",
    redirectTo: "../products",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule {}
