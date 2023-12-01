import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { Layout } from "./components/Layout";
import { ProductList } from "./pages/ProductList";
import { Product } from "./pages/Product";
import { Checkout } from "./pages/Checkout";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import EditProducts from "./pages/EditProducts";
import AuthContext from "./contexts/AuthContext";
import RequireAuth from "./components/RequireAuth";

function App() {
  // States declaration
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(false);

  // Add to cart function declaration
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

  // Close cart function declaration
  const handleCloseCart = () => {
    setShowCart(false);
  };

  // Handle checkout function declaration
  const handleCheckoutSuccess = () => {
    setCart([]);
  };

  // Handle update item function declaration
  const handleUpdateItem = (index, value) => {
    const newCart = [...cart];
    newCart[index].quantity = value;
    setCart(newCart);
  };

  // Handle delete item function declaration
  const handleDeleteItem = (index) => {
    const cartFiltered = cart.filter((product, i) => i !== index);
    setCart(cartFiltered);
  };

  // Login function declaration
  function login(username, password) {
    setUser(true);
  }

  // Logout function declaration
  function logout() {
    setUser(false);
  }

  // Auth object declaration
  const authObject = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authObject}>
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
            <Route path="/" index element={<Home />} />
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
          <Route path="admin" element={<Admin />}></Route>
          <Route
            path="orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="editproducts"
            element={
              <RequireAuth>
                <EditProducts />
              </RequireAuth>
            }
          ></Route>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}
export default App;
