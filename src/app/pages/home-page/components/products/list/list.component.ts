import { Component, EventEmitter, Output } from "@angular/core";
import { ProductsService } from "~services/products.service";
import { IProducts } from "~shared/models/IProducts";

@Component({
  selector: "app-products-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ProductsListComponent {
  @Output() shouldAddToCart = new EventEmitter<IProducts>();

  list: IProducts[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit() {
    this.list = this.service.getProducts() as IProducts[];
  }

  addToCart(item: IProducts) {
    this.shouldAddToCart.emit(item);
  }
}
