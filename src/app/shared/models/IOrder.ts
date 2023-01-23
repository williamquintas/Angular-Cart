import { ICartItem } from "./ICartItem";
import { ICoupon } from "./ICoupon";

export interface IOrder {
  id?: number;
  items: ICartItem[];
  subtotal: number;
  coupons: ICoupon[];
  total: number;
  paymentMethod?: PaymentMethod;
}

export enum PaymentMethod {
  CASH = 1,
  CREDIT_CARD = 2,
  PIX = 3,
  OTHER = 4,
}

export const PaymentMethodLabels = {
  [PaymentMethod.CASH]: "Cash",
  [PaymentMethod.CREDIT_CARD]: "Credit card",
  [PaymentMethod.PIX]: "Pix (Brazil only)",
  [PaymentMethod.OTHER]: "Other",
};
