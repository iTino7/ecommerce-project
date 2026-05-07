import { useCart } from "../context/CartContext";

function ClearCartButton() {
  const { clearCart } = useCart();
  return (
    <button
      onClick={clearCart}
      style={{
        background: "transparent",
        border: "none",
        fontSize: "0.8rem",
        opacity: 0.6,
        textDecoration: "underline",
        cursor: "pointer",
        color: "inherit",
        padding: 0,
      }}
    >
      Svuota tutto
    </button>
  );
}

export default ClearCartButton;
