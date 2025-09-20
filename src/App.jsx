import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import BebidasPage from "./pages/BebidasPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import AddressPage from "./pages/AddressPage";
import CheckoutPage from "./pages/CheckoutPage";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [addresses, setAddresses] = useState([]);

  const location = useLocation();

  // hide NavBar + Footer on these routes
  const hideLayoutRoutes = new Set(["/login"]);

  // Sync cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Sync user to localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Cart Functions
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      {!hideLayoutRoutes.has(location.pathname) && (
        <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} cart={cart} />
      )}

      <Routes>
        <Route
          path="/"
          element={<BebidasPage searchTerm={searchTerm} addToCart={addToCart} />}
        />
        <Route
          path="/category/:slug"
          element={<BebidasPage searchTerm={searchTerm} addToCart={addToCart} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetailsPage addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              increment={(id) => updateQuantity(id, 1)}
              decrement={(id) => updateQuantity(id, -1)}
              removeItem={removeItem}
            />
          }
        />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route
          path="/address"
          element={<AddressPage addresses={addresses} setAddresses={setAddresses} />}
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} addresses={addresses} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {!hideLayoutRoutes.has(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
