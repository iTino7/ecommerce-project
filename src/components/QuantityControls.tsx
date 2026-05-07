import { Minus, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../context/CartContext";

interface Props {
  item: CartItem;
  size?: "sm" | "md";
}

function QuantityControls({ item, size = "md" }: Props) {
  const { updateQuantity } = useCart();
  const reachedMax = item.quantity >= item.stock;
  const iconSize = size === "sm" ? 13 : 14;
  const padding = size === "sm" ? "0.2rem" : "0.25rem";
  const minWidth = size === "sm" ? 16 : 20;
  const fontSize = size === "sm" ? "0.75rem" : "0.9rem";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <button
        className="search-btn"
        style={{ padding }}
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
        aria-label="Diminuisci"
      >
        <Minus size={iconSize} />
      </button>
      <span style={{ fontSize, fontWeight: 500, minWidth, textAlign: "center" }}>
        {item.quantity}
      </span>
      <button
        className="search-btn"
        style={{ padding, opacity: reachedMax ? 0.3 : 1 }}
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
        disabled={reachedMax}
        aria-label="Aumenta"
      >
        <Plus size={iconSize} />
      </button>
    </div>
  );
}

export default QuantityControls;
