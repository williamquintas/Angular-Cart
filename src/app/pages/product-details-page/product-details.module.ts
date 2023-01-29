import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CoreModule } from "~core/core.module";
import { SharedModule } from "~shared/shared.module";
import { ProductDetailsPage } from "./product-details-page.component";
import { RoutingModule } from "./routing.module";

@NgModule({
  declarations: [ProductDetailsPage],
  imports: [
    CommonModule,
    CoreModule,
    RoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ProductDetailsPageModule {}
