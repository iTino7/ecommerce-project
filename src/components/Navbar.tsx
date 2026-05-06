import { useState } from "react";
import { Search, X, ShoppingCart, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "../context/CartContext";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { items, openCart } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <nav style={{
        width: "100%",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        zIndex: 50,
      }}>
        {/* Logo + search desktop */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <h2 style={{ margin: 0, fontSize: "2rem", fontFamily: "'Playwrite NZ Guides', cursive" }}>SkyCart</h2>

          <div className="navbar-desktop search-group" style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
            <div className="search-divider" style={{ width: "1px", height: "1.2rem", backgroundColor: "currentColor", opacity: 0.2 }} />
            <button className={`search-btn${isSearchOpen ? " search-open" : ""}`} onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <span className="icon-search"><Search size={18} /></span>
              <span className="icon-x"><X size={18} /></span>
            </button>
            <div className={`search-input-wrapper${isSearchOpen ? " search-input-visible" : ""}`}>
              <Input placeholder="What are you looking for?" autoFocus={isSearchOpen} />
            </div>
          </div>
        </div>

        {/* Desktop right actions */}
        <div className="navbar-desktop" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ cursor: "pointer", fontSize: "0.95rem" }}>Catalogo</span>
          <button className="search-btn cart-btn" onClick={() => openCart()}>
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="search-btn" onClick={() => navigate("/login")}><User size={18} /></button>
          <ThemeToggle />
        </div>

        {/* Mobile right: theme toggle + hamburger */}
        <div className="navbar-hamburger" style={{ alignItems: "center", gap: "0.25rem" }}>
          <ThemeToggle />
          <button
            className="search-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Apri menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${isMobileMenuOpen ? " mobile-menu-open" : ""}`}>
        <div className="mobile-menu-inner">
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 0.8rem" }}>
            <Search size={18} style={{ opacity: 0.5, flexShrink: 0 }} />
            <Input placeholder="What are you looking for?" style={{ flex: 1 }} />
          </div>

          <button className="search-btn mobile-menu-btn" onClick={() => { openCart(); setIsMobileMenuOpen(false); }}>
            <ShoppingCart size={18} /> <span>Carrello</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button className="search-btn mobile-menu-btn" onClick={() => { navigate("/login"); setIsMobileMenuOpen(false); }}>
            <User size={18} /> <span>Account</span>
          </button>
          <button className="search-btn mobile-menu-btn">
            <span>Catalogo</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
