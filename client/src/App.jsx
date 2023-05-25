import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { Product } from "./pages/Product";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="products" element={<Product />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
