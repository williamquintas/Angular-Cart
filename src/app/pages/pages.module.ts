import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { CartPageComponent } from "./cart-page/cart-page.component";
import { HomePageComponent } from "./home-page/home-page.component";

@NgModule({
  declarations: [HomePageComponent, CartPageComponent],
  imports: [CommonModule, SharedModule],
})
export class PagesModule {}
