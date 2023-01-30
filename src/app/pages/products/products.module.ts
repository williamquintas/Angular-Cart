import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { CoreModule } from "~core/core.module";
import { HomePage } from "~pages/home-page/home-page.component";
import { SharedModule } from "~shared/shared.module";

import { ProductsItemComponent } from "./components/item/item.component";
import { ProductsListComponent } from "./components/list/list.component";
import { DetailsPage } from "./details-page/details-page.component";
import { ListPage } from "./list-page/list-page.component";
import { RoutingModule } from "./routing.module";

@NgModule({
  declarations: [
    HomePage,
    DetailsPage,
    ListPage,
    ProductsListComponent,
    ProductsItemComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    CoreModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ProductsModule {}
