import { useCart } from "../context/CartContext";

function Products() {
  const { addItem } = useCart();
  const items = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <section style={{ padding: "4rem 2rem", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "2rem" }}>Prodotti</h2>
      <div className="products-flex">
        {items.map(i => (
          <div
            key={i}
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
            onClick={() => addItem({ id: i, name: `Prodotto ${i}`, price: i * 19.99 })}
          >
            <div style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: "8px",
              backgroundColor: "rgba(128,128,128,0.1)",
            }} />
            <div style={{ fontSize: "0.95rem", fontWeight: 500 }}>Prodotto {i}</div>
            <div style={{ fontSize: "0.85rem", opacity: 0.5 }}>€ {(i * 19.99).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Products;
