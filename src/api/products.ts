import type { Product } from "../types/product";

const BASE_URL = "http://localhost:3002/api/products";

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) return null;
  return res.json();
}
