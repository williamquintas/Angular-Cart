import { IProduct } from "./Product.interface";

export interface ICartItem extends IProduct {
  quantity: number;
}
