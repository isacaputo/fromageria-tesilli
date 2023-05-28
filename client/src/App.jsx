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
    // todo: mapear o array atual e se existir o no array algum item com o mesmo productId e mesmo size então, incrementar 1 ou o numero de quantidades que veio
    cart.map((product) => {
      if (product.id === item.id && product.size === item.size) {
        product.quantity += item.quantity;
      } else {
        setCart((state) => [...state, item]);
      }
    });
  };

  const handleDeleteFromCart = (product) => {};

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout cart={cart} setCart={setCart} />}>
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
