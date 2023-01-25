import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { CoreModule } from "~core/core.module";
import { PagesModule } from "~pages/pages.module";
import { SharedModule } from "~shared/shared.module";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, PagesModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
