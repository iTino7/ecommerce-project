import { useState } from "react";
import { Search, X, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav style={{
      width: "100%",
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <h2 style={{ margin: 0, fontSize: "2rem", fontFamily: "'Playwrite NZ Guides', cursive" }}>Shopia</h2>
        <div className="search-group" style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
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
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ cursor: "pointer", fontSize: "0.95rem" }}>Catalogo</span>
        <button className="search-btn"><ShoppingCart size={18} /></button>
        <button className="search-btn" onClick={() => navigate("/login")}><User size={18} /></button>
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
