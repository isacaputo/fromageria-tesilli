import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { ProductList } from "./pages/ProductList";
import { Product } from "./pages/Product";
import { Checkout } from "./pages/Checkout";

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
  };

  const handleAddCart = (item) => {
    console.log(item);
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

    setShowCart(true);
  };

  const handleDeleteItem = (index) => {
    const cartFiltered = cart.filter((product, i) => i !== index);
    setCart(cartFiltered);
  };

  const handleUpdateItem = (index, value) => {
    const newCart = [...cart];
    newCart[index].quantity = value;
    setCart(newCart);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              cart={cart}
              onDeleteItem={handleDeleteItem}
              onUpdateQuantity={handleUpdateItem}
              showCart={showCart}
              onCloseCart={handleCloseCart}
              onOpenCart={() => setShowCart(true)}
            />
          }
        >
          <Route
            path="products"
            element={<ProductList onAddCart={handleAddCart} />}
          />
          <Route
            path="products/:id"
            element={<Product onAddCart={handleAddCart} />}
          />
          <Route
            path="checkout"
            element={
              <Checkout
                cart={cart}
                showCart={showCart}
                onSuccess={handleCheckoutSuccess}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
