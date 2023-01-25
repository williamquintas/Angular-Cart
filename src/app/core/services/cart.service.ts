import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ICartItem } from "~shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartItems: ICartItem[] = [];
  private cartItems$ = new BehaviorSubject<ICartItem[]>(this.cartItems);

  constructor() {}

  getAll() {
    return this.cartItems$;
  }

  add(item: ICartItem) {
    const itemToAddIndex = this.cartItems.findIndex(({ id }) => id === item.id);

    if (itemToAddIndex >= 0) {
      this.cartItems[itemToAddIndex].quantity += 1;
    } else {
      this.cartItems.push(item);
    }

    this.cartItems$.next(this.cartItems);
  }

  update(item: ICartItem) {
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

  clear() {
    this.cartItems = [];
    this.cartItems$.next(this.cartItems);
  }
}
