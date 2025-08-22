import { useState, useEffect } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Layout } from './components/Layout';
import { ProductList } from './pages/ProductList';
import { Product } from './pages/Product';
import { Checkout } from './pages/Checkout';
import Admin from './pages/Admin';
import Orders from './pages/Orders';
import EditProducts from './pages/EditProducts';
import AuthContext from './contexts/AuthContext';
import RequireAuth from './components/RequireAuth';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(false);

  // Handling the shopping cart
  const handleCloseCart = () => {
    setShowCart(false);
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
  };

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

  // Handling Login and Logout
  function login(username, password) {
    setUser(true);
  }
  function logout() {
    setUser(false);
  }

  // Storing into an object the multiple pieces of data that I want to have in the context
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
