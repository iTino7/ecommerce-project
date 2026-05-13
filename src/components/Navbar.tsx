import { useState, useRef, useEffect } from "react";
import { Search, X, ShoppingCart, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "../context/CartContext";
import { useProducts } from "../hooks/useProducts";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { items, openCart } = useCart();
  const { data: products } = useProducts();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const q = searchQuery.trim().toLowerCase();
  const matches = q
    ? (products ?? []).filter(p => p.name.toLowerCase().includes(q))
    : [];

  const desktopOpen = isSearchOpen && matches.length > 0;
  const mobileOpen = isMobileMenuOpen && matches.length > 0;

  useEffect(() => {
    if (!desktopOpen) return;
    const t = setTimeout(() => desktopInputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [desktopOpen, matches.length]);

  useEffect(() => {
    if (!mobileOpen) return;
    const t = setTimeout(() => mobileInputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, [mobileOpen, matches.length]);

  const pickProduct = (id: number) => {
    navigate(`/products/${id}`);
    setSearchQuery("");
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!q) return;
    if (matches.length === 1) {
      pickProduct(matches[0].id);
    } else if (matches.length === 0) {
      toast.error("Nessun prodotto trovato");
    }
  };

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
          <h2
            onClick={() => navigate("/")}
            style={{ margin: 0, fontSize: "2rem", fontFamily: "'Playwrite NZ Guides', cursive", cursor: "pointer" }}
          >
            SkyCart
          </h2>

          <div className="navbar-desktop search-group" style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
            <div className="search-divider" style={{ width: "1px", height: "1.2rem", backgroundColor: "currentColor", opacity: 0.2 }} />
            <button className={`search-btn${isSearchOpen ? " search-open" : ""}`} onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <span className="icon-search"><Search size={18} /></span>
              <span className="icon-x"><X size={18} /></span>
            </button>
            <div
              className={`search-input-wrapper${isSearchOpen ? " search-input-visible" : ""}`}
              style={{ position: "relative" }}
            >
              <Input
                ref={desktopInputRef}
                placeholder="What are you looking for?"
                autoFocus={isSearchOpen}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
              <DropdownMenu open={desktopOpen} onOpenChange={() => {}} modal={false}>
                <DropdownMenuTrigger
                  aria-hidden
                  tabIndex={-1}
                  style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none", padding: 0, border: "none" }}
                />
                <DropdownMenuContent align="start" sideOffset={8} className="max-h-72 w-(--anchor-width)">
                  {matches.map(p => (
                    <DropdownMenuItem
                      key={p.id}
                      onMouseDown={e => { e.preventDefault(); pickProduct(p.id); }}
                      className="flex items-center gap-2"
                    >
                      <img src={p.imageUrl} alt="" style={{ width: 28, height: 28, borderRadius: 4, objectFit: "cover" }} />
                      <span className="truncate">{p.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
          <div style={{ position: "relative", padding: "0.4rem 0.8rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Search size={18} style={{ opacity: 0.5, flexShrink: 0 }} />
              <Input
                ref={mobileInputRef}
                placeholder="What are you looking for?"
                style={{ flex: 1 }}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
              />
            </div>
            <DropdownMenu open={mobileOpen} onOpenChange={() => {}} modal={false}>
              <DropdownMenuTrigger
                aria-hidden
                tabIndex={-1}
                style={{ position: "absolute", inset: 0, opacity: 0, pointerEvents: "none", padding: 0, border: "none" }}
              />
              <DropdownMenuContent align="start" sideOffset={4} className="max-h-72 w-(--anchor-width)">
                {matches.map(p => (
                  <DropdownMenuItem
                    key={p.id}
                    onMouseDown={e => { e.preventDefault(); pickProduct(p.id); }}
                    className="flex items-center gap-2"
                  >
                    <img src={p.imageUrl} alt="" style={{ width: 28, height: 28, borderRadius: 4, objectFit: "cover" }} />
                    <span className="truncate">{p.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
