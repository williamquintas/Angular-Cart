import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ICartItems } from "~shared/models/ICartItems";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems: ICartItems[] = [
    {
      id: 0,
      title: "Thriller",
      description: "Michael Jackson | 1982",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png",
      unitPrice: 51.29,
      quantity: 3,
    },
  ];
  private cartItems$ = new BehaviorSubject<ICartItems[]>(this.cartItems);

  constructor() {}

  getAll() {
    return this.cartItems$;
  }

  add(item: ICartItems) {
    const itemToAddIndex = this.cartItems.findIndex(({ id }) => id === item.id);

    if (itemToAddIndex >= 0) {
      this.cartItems[itemToAddIndex].quantity += 1;
    } else {
      this.cartItems.push(item);
    }

    this.cartItems$.next(this.cartItems);
  }

  update(item: ICartItems) {
    const itemToUpdateIndex = this.cartItems.findIndex(
      ({ id }) => id === item.id
    );

    if (itemToUpdateIndex === -1) {
      throw new Error("[CartService] Item not found");
    } else {
      if (item.quantity === 0) {
        this.cartItems.splice(itemToUpdateIndex, 1);
      } else {
        this.cartItems[itemToUpdateIndex] = item;
      }
      this.cartItems$.next(this.cartItems);
    }
  }
}
