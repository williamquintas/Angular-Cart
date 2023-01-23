import { Injectable } from "@angular/core";
import data from "~shared/data/products.json";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  getProducts = () => {
    return data.products;
  };
}
