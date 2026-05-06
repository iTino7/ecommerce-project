export interface Product {
  id: number;
  name: string;
  price: number;
}

export const products: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Prodotto ${i + 1}`,
  price: (i + 1) * 19.99,
}));
