import { Component } from "@angular/core";
import storeConfig from "~shared/data/config.json";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {
  name = storeConfig.name ?? "Store";
  year = new Date().getFullYear();
}
