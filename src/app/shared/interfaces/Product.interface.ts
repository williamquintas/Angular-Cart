export interface IProduct {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  unitPrice: number;
}

export enum ProductCategory {
  ROCK = 1,
  POP = 2,
  OTHERS = 3,
}

export const ProductCategoryLabels: { [key: number]: string } = {
  [ProductCategory.ROCK]: "Rock",
  [ProductCategory.POP]: "Pop",
  [ProductCategory.OTHERS]: "Others",
};
