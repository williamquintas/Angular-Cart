import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { ICartItems } from "../../models/ICartItems";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent {
  @ViewChild("sidenav") cart!: MatSidenav;
  @Input() isCartOpened: boolean = false;
  @Input() items: ICartItems[] = [];
  @Output() shouldCloseCart = new EventEmitter<any>();

  closeCart() {
    this.shouldCloseCart.emit();
  }

  updateQuantity(id: number, newQuantity: number) {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    if (itemIndex >= 0) {
      if (newQuantity === 0) {
        this.items.splice(itemIndex, 1);
      } else {
        this.items[itemIndex].quantity = newQuantity;
      }
    }
  }

  calculateSubtotal(): number {
    return this.items.reduce((currentSum, item) => {
      return (currentSum += item.unitPrice * item.quantity);
    }, 0);
  }

  calculateTotal(): number {
    return this.items.reduce((currentSum, item) => {
      return (currentSum += item.unitPrice * item.quantity);
    }, 0);
  }
}
