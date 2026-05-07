import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import AuthPage from "./pages/AuthPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartSidebar from "./components/CartSidebar";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "@/components/ui/sonner";

function Home() {
  const [heroGone, setHeroGone] = useState(() => sessionStorage.getItem("heroSeen") === "true");

  const handleHeroDone = () => {
    sessionStorage.setItem("heroSeen", "true");
    setHeroGone(true);
  };

  return (
    <div>
      <Navbar />
      <div
        className="products-scroll"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          overflowY: heroGone ? "auto" : "hidden",
          paddingTop: "72px",
        }}
      >
        <Products />
      </div>
      {!heroGone && <Hero onDone={handleHeroDone} />}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" richColors />
        <CartSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
