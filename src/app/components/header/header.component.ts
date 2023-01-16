import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  @Input() name: string = "My Store";
  @Input() icon: string | undefined = undefined;

  @Output() toggleCartOpened = new EventEmitter<any>();

  toggleCart() {
    this.toggleCartOpened.emit();
  }
}
