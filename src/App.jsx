// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Contexts
import UserContext from './context/UserContext';
import { themeContext } from './context/ThemeContext';

// Redux
import { Provider } from 'react-redux';
import Store from './redux/Store';

// Components
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import WishList from './components/WishList';
import ProductDetails from './components/ProductDetails';
import Login from './components/Login';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import Error from './components/Error';
import AddressForm from './checkout/AddressForm';
import PaymentForm from './checkout/PaymentForm';
import OrderSuccess from './checkout/OrderSuccess';

export default function App() {
  const { darkMode } = useContext(themeContext) || {};
  const isDark = darkMode === 'true' || darkMode === true;

  return (
    <div className={`${isDark ? 'dark' : ''} dark:bg-gray-900 min-h-screen`}>
      <UserContext>
        <Provider store={Store}>
          <BrowserRouter>
            {/* Fixed header: height 64px */}
            <header className="fixed top-0 left-0 right-0 z-50 h-16 shadow-sm">
              <Header />
            </header>

            {/* Offset content by the exact header height */}
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/productdetails/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Error />} />
                <Route path="/checkout/address" element={<AddressForm />} />
                <Route path="/checkout/payment" element={<PaymentForm />} />
                <Route path="/checkout/success" element={<OrderSuccess />} />
              </Routes>
            </main>
          </BrowserRouter>
        </Provider>
      </UserContext>
    </div>
  );
}