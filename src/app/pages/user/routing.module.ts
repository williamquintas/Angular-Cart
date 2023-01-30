import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { IsLoggedInGuard } from "~core/guards";
import storeConfig from "~shared/data/config.json";

import { LoginPage } from "./login-page/login-page.component";
import { UserPage } from "./user-page/user-page.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    component: UserPage,
    title: `${storeConfig.name} | User`,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: "login",
    component: LoginPage,
    title: `${storeConfig.name} | Login`,
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
