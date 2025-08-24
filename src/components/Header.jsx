// src/components/Header.jsx
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { userContext } from '../context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../redux/productsSlice';
import Switcher from './Switcher';
import { logout } from '../redux/authSlice';
import {
  FiHome,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isLoggedIn } = useContext(userContext);

  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Total quantity in cart
  const cartCount = useSelector((state) =>
    (state.cart.items || []).reduce((sum, item) => sum + (item.qty || 1), 0)
  );

  // Wishlist count
  const wishlistCount = useSelector((state) => state.wishlist.items?.length || 0);

  // Global search term
  const globalSearch = useSelector((state) => state.products.search || '');
  const [q, setQ] = useState(globalSearch);

  // Sync local input with global search (when changed from elsewhere)
  useEffect(() => {
    setQ(globalSearch);
  }, [globalSearch]);

  // Debounce search and navigate only if on home (or force reset)
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = q.trim();
      dispatch(setSearch(trimmed));

      // Only navigate to home if not already there
      if (trimmed && location.pathname !== '/') {
        navigate('/');
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [q, dispatch, navigate, location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileMenu(false);
  };

  return (
    // Fixed container provides height; keep header height in sync with App.jsx pt-16
    <div className="h-16 flex items-center justify-between px-4 bg-gradient-to-r from-amber-900 to-amber-700 dark:from-stone-900 dark:to-stone-900 text-white dark:text-stone-100 border-b border-amber-950 dark:border-stone-800">
      {/* Left: brand + mobile toggles */}
      <div className="flex items-center gap-3 w-full lg:w-auto">
        <div className="text-2xl font-bold">SwiftShop</div>

        {/* Mobile search */}
        <div className="flex-1 lg:hidden">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-2 rounded-md text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setShowLinks((v) => !v)}
          className="lg:hidden focus:outline-none text-blue-200 hover:text-white p-2"
          aria-label="Toggle navigation"
        >
          {showLinks ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Right: nav links */}
      <ul
        className={`lg:flex lg:flex-row items-center font-semibold text-lg gap-4 ${
          showLinks
            ? 'block absolute top-16 left-0 right-0 bg-amber-800/95 dark:bg-stone-900/95 px-4 py-3 z-40'
            : 'hidden lg:flex'
        }`}
      >
        {/* Desktop search */}
        <li className="hidden lg:block flex-1 max-w-xl">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-md text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </li>

        {/* Home */}
        <li>
          <Link
            to="/"
            className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-amber-800/60 dark:hover:bg-stone-800/60"
            title="Home"
            onClick={() => setShowLinks(false)}
          >
            <FiHome size={20} />
            <span className="lg:hidden">Home</span>
          </Link>
        </li>

        {/* Cart */}
        <li className="relative">
          <Link
            to="/cart"
            className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-amber-800/60 dark:hover:bg-stone-800/60"
            title="Shopping Cart"
            onClick={() => setShowLinks(false)}
          >
            <div className="relative">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="lg:hidden">Cart</span>
          </Link>
        </li>

        {/* Wishlist */}
        <li className="relative">
          <Link
            to="/wishlist"
            className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-amber-800/60 dark:hover:bg-stone-800/60"
            title="Wishlist"
            onClick={() => setShowLinks(false)}
          >
            <div className="relative">
              <FiHeart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-rose-600 text-white text-xs font-semibold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="lg:hidden">Wishlist</span>
          </Link>
        </li>

        {/* Profile + dropdown */}
        <li className="relative">
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu((v) => !v)}
              className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-amber-800/60 dark:hover:bg-stone-800/60 focus:outline-none"
              title={isAuthenticated ? `Profile - ${user}` : 'User Profile'}
            >
              <FiUser size={20} />
              <span className="lg:hidden">Profile</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="py-2">
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">Welcome!</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <FiUser className="mr-3" size={16} />
                        My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                      >
                        <FiLogOut className="mr-3" size={16} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <FiUser className="mr-3" size={16} />
                        Login
                      </Link>

                      <Link
                        to="/register"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <FiUser className="mr-3" size={16} />
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </li>

        {/* Theme Switcher */}
        <li className="flex items-center mx-2 my-3 lg:my-0">
          <Switcher />
        </li>
      </ul>

      {/* Click-away overlay for profile menu on mobile */}
      {showProfileMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
      )}
    </div>
  );
}