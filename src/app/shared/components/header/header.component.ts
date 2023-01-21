import { Component, EventEmitter, Output } from "@angular/core";
import storeConfig from "~shared/data/config.json";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  name = storeConfig.name ?? "Store";
  icon = storeConfig.icon ?? "bi-shop";

  @Output() toggleCartOpened = new EventEmitter<any>();
  isMenuCollapsed = true;

  toggleCart() {
    this.toggleCartOpened.emit();
  }
}
