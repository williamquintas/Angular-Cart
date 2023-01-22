import { Component, Input } from "@angular/core";
import { CartService } from "~services/cart.service";
import { ToastsService } from "~services/toasts.service";
import { IProducts } from "~shared/models/IProducts";

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

  constructor(
    private cartService: CartService,
    private toastsService: ToastsService
  ) {}

  addToCart() {
    const cartItem = { ...this.item, quantity: 1 };
    this.cartService.add(cartItem);
    this.toastsService.show({ body: "Product added to cart!" });
  }
}
