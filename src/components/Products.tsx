import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { Product } from "../types/product";

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3002/api/products");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function Products() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const products = data?.slice(0, 10) ?? [];

  return (
    <section style={{ padding: "4rem 2rem", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "2rem" }}>Prodotti</h2>
      {isLoading && <p style={{ opacity: 0.5 }}>Caricamento...</p>}
      {error && <p style={{ color: "tomato" }}>Errore: {error.message}</p>}
      <div className="products-flex">
        {products.map(product => (
          <div
            key={product.id}
            className="product-card"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid rgba(128,128,128,0.2)",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/products/${product.id}`)}
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{
                width: "100%",
                aspectRatio: "1",
                borderRadius: "8px",
                objectFit: "cover",
                backgroundColor: "rgba(128,128,128,0.1)",
              }}
            />
            <div style={{ fontSize: "0.95rem", fontWeight: 500 }}>{product.name}</div>
            <div style={{ fontSize: "0.85rem", opacity: 0.5 }}>€ {product.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
