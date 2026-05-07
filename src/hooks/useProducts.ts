import { useQuery } from "@tanstack/react-query";
import { fetchProduct, fetchProducts } from "../api/products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });
}
