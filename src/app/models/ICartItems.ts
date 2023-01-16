import { IProducts } from "./IProducts";

export interface ICartItems extends IProducts {
  quantity: number;
}
