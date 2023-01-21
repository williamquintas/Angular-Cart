import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePageComponent } from "~pages/home-page/home-page.component";
import storeConfig from "~shared/data/config.json";

const routes: Routes = [
  {
    path: "home",
    component: HomePageComponent,
    title: storeConfig.name,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "**",
    redirectTo: "home",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
