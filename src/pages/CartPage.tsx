import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";

function CartPage() {
  const { items, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        opacity: 0.5,
      }}>
        <span style={{ fontSize: "3rem" }}>🛒</span>
        <p style={{ fontSize: "1.2rem", fontWeight: 500, margin: 0 }}>Il tuo carrello è vuoto</p>
        <p style={{ fontSize: "0.9rem", margin: 0 }}>Aggiungi qualche prodotto per iniziare</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "6rem 2rem 4rem" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "2rem" }}>Carrello</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {items.map(item => (
          <div key={item.id} style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem",
            borderRadius: "12px",
            border: "1px solid rgba(128,128,128,0.2)",
          }}>
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "8px",
                backgroundColor: "rgba(128,128,128,0.1)",
                objectFit: "cover",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{item.name}</div>
              <div style={{ fontSize: "0.85rem", opacity: 0.5 }}>Quantità: {item.quantity}</div>
            </div>
            <div style={{ fontWeight: 600 }}>€ {(item.price * item.quantity).toFixed(2)}</div>
            <button
              onClick={() => removeItem(item.id)}
              className="search-btn"
              style={{ color: "inherit", opacity: 0.5 }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: "2rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid rgba(128,128,128,0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <span style={{ fontSize: "1rem", fontWeight: 500 }}>Totale</span>
        <span style={{ fontSize: "1.3rem", fontWeight: 700 }}>€ {total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CartPage;
