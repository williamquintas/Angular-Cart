import { Injectable } from "@angular/core";
import data from "../data/products.json";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  getProducts = () => {
    console.log(data.products);
    return data.products;
  };
}
