import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import AuthPage from "./pages/AuthPage";
import CartSidebar from "./components/CartSidebar";
import { CartProvider } from "./context/CartContext";

function Home() {
  const [heroGone, setHeroGone] = useState(false);

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
      {!heroGone && <Hero onDone={() => setHeroGone(true)} />}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CartSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
