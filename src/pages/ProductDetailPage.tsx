import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

async function fetchProduct(id: string): Promise<Product | null> {
  const res = await fetch(`http://localhost:3002/api/products/${id}`);
  if (!res.ok) return null;
  return res.json();
}

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, openCart } = useCart();
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.5 }}>
          Caricamento...
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          opacity: 0.5,
        }}>
          <p style={{ fontSize: "1.2rem", fontWeight: 500, margin: 0 }}>Prodotto non trovato</p>
          <button
            className="search-btn"
            style={{ fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} /> Torna indietro
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "7rem 2rem 4rem" }}>
        <button
          className="search-btn"
          style={{ fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "2rem" }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> Torna indietro
        </button>

        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              flex: "1 1 320px",
              aspectRatio: "1",
              borderRadius: "16px",
              backgroundColor: "rgba(128,128,128,0.1)",
              minHeight: "300px",
              objectFit: "cover",
            }}
          />

          <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.75rem", fontWeight: 700 }}>{product.name}</h1>
              <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: 600, opacity: 0.85 }}>
                € {product.price.toFixed(2)}
              </p>
            </div>

            <p style={{ margin: 0, fontSize: "0.85rem", opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {product.category} · {product.stock > 0 ? `${product.stock} disponibili` : "Esaurito"}
            </p>

            <p style={{ margin: 0, fontSize: "0.95rem", opacity: 0.55, lineHeight: 1.6 }}>
              {product.description}
            </p>

            <button
              onClick={() => { addItem(product); openCart(); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.85rem 1.5rem",
                borderRadius: "12px",
                border: "none",
                backgroundColor: "#646cff",
                color: "#fff",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              <ShoppingCart size={18} /> Aggiungi al carrello
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailPage;
