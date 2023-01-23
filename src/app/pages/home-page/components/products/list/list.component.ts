import { Component } from "@angular/core";
import { ProductsService } from "~services/products.service";
import { IProduct } from "~shared/models/IProduct";

@Component({
  selector: "app-products-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ProductsListComponent {
  list: IProduct[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.list = this.service.getProducts() as IProduct[];
  }
}
