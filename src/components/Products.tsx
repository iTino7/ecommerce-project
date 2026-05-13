import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductsPagination from "./ProductsPagination";

const PAGE_SIZE = 30;

function Products() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((data?.length ?? 0) / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const products = data?.slice(start, start + PAGE_SIZE) ?? [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      <ProductsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}

export default Products;
