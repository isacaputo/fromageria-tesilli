import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { ProductList } from "./pages/ProductList";
import { Product } from "./pages/Product";
import { Checkout } from "./pages/Checkout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="products" element={<ProductList />} />
          <Route path="products/:id" element={<Product />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
