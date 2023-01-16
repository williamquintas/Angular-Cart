import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ICartItems } from "./models/ICartItems";
import { IProducts } from "./models/IProducts";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  config = {
    name: "Music Store",
    icon: "library_music",
  };
  cartItems: ICartItems[] = [];
  isCartOpened = false;

  constructor(private _snackBar: MatSnackBar) {}

  closeCart() {
    this.isCartOpened = false;
  }

  addToCart(item: IProducts) {
    const itemIndex = this.cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    const isItemAlreadyInCart = itemIndex >= 0;

    if (isItemAlreadyInCart) {
      this.cartItems[itemIndex].quantity += 1;
    } else {
      this.cartItems.push({
        ...item,
        quantity: 1,
      });
    }

    this._snackBar.open("Product added to cart!", "Dismiss", {
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 2000,
    });
  }
}
