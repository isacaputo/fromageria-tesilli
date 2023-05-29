import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { ProductList } from "./pages/ProductList";
import { Product } from "./pages/Product";
import { Checkout } from "./pages/Checkout";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddCart = (item) => {
    const existingIndexItem = cart.findIndex(
      (value) => value.id === item.id && value.size === item.size
    );
    if (existingIndexItem >= 0) {
      const currentCart = [...cart];
      currentCart[existingIndexItem].quantity += item.quantity;
      setCart(currentCart);
    } else {
      setCart((state) => [...state, item]);
    }
  };

  const handleDeleteItem = (index) => {
    const cartFiltered = cart.filter((product, i) => i !== index); // bad practice, not re-fetching is having a bad source of truth, if I update the list only in the frontend, things are not syncronized. If my page is showing 10 results and I update the frontend, what happens?
    setCart(cartFiltered);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Layout cart={cart} onDeleteItem={handleDeleteItem} />}
        >
          <Route path="products" element={<ProductList />} />
          <Route
            path="products/:id"
            element={<Product onAddCart={handleAddCart} />}
          />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
