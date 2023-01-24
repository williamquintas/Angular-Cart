import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IProduct } from "~models/IProduct";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts = () => {
    return this.httpClient.get<IProduct[]>("/products");
  };
}
