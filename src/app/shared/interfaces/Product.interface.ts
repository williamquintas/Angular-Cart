import { IQueryParameters } from "./Api.interface";

interface IProduct {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  unitPrice: number;
}

enum ProductCategory {
  ROCK = 1,
  POP = 2,
  OTHERS = 3,
}

const ProductCategoryLabels: { [key: number]: string } = {
  [ProductCategory.ROCK]: "Rock",
  [ProductCategory.POP]: "Pop",
  [ProductCategory.OTHERS]: "Others",
};

interface IProductQueryParameters extends IQueryParameters {
  category?: string;
}

export {
  IProduct,
  ProductCategory,
  ProductCategoryLabels,
  IProductQueryParameters,
};
