import { Component, EventEmitter, Input, Output } from "@angular/core";
import { IProducts } from "~models/IProducts";

@Component({
  selector: "app-products-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
})
export class ProductsItemComponent {
  @Input() item: IProducts = {
    id: 0,
    title: "",
    description: "",
    imageUrl: "",
    unitPrice: 0,
  };

  @Output() addItemToCart = new EventEmitter<IProducts>();

  addToCart() {
    this.addItemToCart.emit(this.item);
  }
}
