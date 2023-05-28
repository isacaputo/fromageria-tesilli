import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { ProductList } from "./pages/ProductList";
import { Product } from "./pages/Product";
import { Checkout } from "./pages/Checkout";

/*
{
  name: "efdf",

}


*/

function App() {
  const [cart, setCart] = useState([]);

  console.log(cart);

  const handleAddCart = (item) => {
    const sameProductInCart = cart.filter(
      (productInCart) =>
        productInCart.id === item.id && productInCart.size === item.size
    );
    if (sameProductInCart.length === 0) {
      setCart((state) => [...state, item]);
    } else {
      cart.map((productInCart) => {
        if (productInCart.id === item.id && productInCart.size === item.size) {
          productInCart.quantity += item.quantity;
        }
      });
    }
  };

  const handleDeleteCart = (index) => {
    console.log(index);
    const cartFiltered = cart.filter((product, i) => i !== index); // bad practice, not re-fetching is having a bad source of truth, if I update the list only in the frontend, things are not syncronized. If my page is showing 10 results and I update the frontend, what happens?
    setCart(cartFiltered);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Layout cart={cart} onDeleteCart={handleDeleteCart} />}
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
