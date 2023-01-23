import { Component } from "@angular/core";
import storeConfig from "~shared/data/config.json";
@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePage {
  name = storeConfig.name;
}
