export const Category = {
  Beauty: "BEAUTY",
  Books: "BOOKS",
  Clothing: "CLOTHING",
  Electronics: "ELECTRONICS",
  Home: "HOME",
  Sports: "SPORTS",
  Toys: "TOYS",
} as const;

export type Category = (typeof Category)[keyof typeof Category];

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  stock: number;
  imageUrl: string;
}
