import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PagesRoutingModule } from "./pages-routing.module";

import { PagesComponent } from "./pages.component";

@NgModule({
  declarations: [PagesComponent],
  imports: [RouterModule, PagesRoutingModule],
  exports: [PagesComponent],
})
export class PagesModule {}
