import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/NavbarComponent/Index";
import CartPage from "./pages/cart-page/Index";
import Home from "./pages/home-page/Index";
import ProductPage from "./pages/products-page/Index";
import "./App.scss";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
      <Toaster
        gutter={1}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
