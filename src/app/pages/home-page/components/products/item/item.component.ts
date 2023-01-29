import { Component, Input } from "@angular/core";
import { CartService, ToastService } from "~core/services";
import { IProduct } from "~shared/interfaces";

@Component({
  selector: "app-products-item",
  templateUrl: "./item.component.html",
  styleUrls: ["./item.component.scss"],
})
export class ProductsItemComponent {
  @Input() item: IProduct = {
    id: 0,
    title: "",
    description: "",
    imageUrl: "",
    unitPrice: 0,
  };

  constructor(
    private cartService: CartService,
    private toastService: ToastService
  ) {}

  addToCart(event: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    const cartItem = { ...this.item, quantity: 1 };
    this.cartService.add(cartItem);
    this.toastService.show({ body: "Product added to cart!" });
  }
}
