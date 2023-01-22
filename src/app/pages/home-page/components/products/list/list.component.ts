import { Component } from "@angular/core";
import { ProductsService } from "~services/products.service";
import { IProducts } from "~shared/models/IProducts";

@Component({
  selector: "app-products-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ProductsListComponent {
  list: IProducts[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.list = this.service.getProducts() as IProducts[];
  }
}
