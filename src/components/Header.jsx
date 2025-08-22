import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { userContext } from '../context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../redux/productsSlice';
import avatar from '/avatar.png';
import Switcher from './Switcher';
import { logout } from '../redux/authSlice';
import { 
  FiHome, 
  FiShoppingCart, 
  FiHeart,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isLoggedIn } = useContext(userContext);

  const navigate = useNavigate();
  const location = useLocation();

  // Inside your Header component:
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileMenu(false);
  };

  // Total quantity in cart (sum of qty across all items)
  const cartCount = useSelector(
    (s) => (s?.cart?.items || []).reduce((sum, i) => sum + (i.qty || 0), 0)
  );

  // Distinct wishlist items count
  const wishlistCount = useSelector((s) => s?.wishlist?.items?.length || 0);

  // Global search from Redux and local input state
  const globalSearch = useSelector((s) => s?.products?.search || '');
  const [q, setQ] = useState(globalSearch);

  // Keep local input in sync if global search changes elsewhere
  useEffect(() => {
    setQ(globalSearch);
  }, [globalSearch]);

  // Debounce updates to global search, navigate to Home to reveal results
  useEffect(() => {
    const t = setTimeout(() => {
      if (location.pathname !== '/') navigate();
      dispatch(setSearch(q.trim()));
    }, 250);
    return () => clearTimeout(t);
  }, [q, dispatch, navigate, location.pathname]);

  return (
    <div className="bg-gradient-to-r from-amber-900 to-amber-700 dark:from-stone-900 dark:to-stone-900 text-white dark:text-stone-100 border-b border-amber-950 dark:border-stone-800 p-2 flex flex-col lg:flex-row lg:justify-between transition-all duration-300 lg:h-[8vh]">
      <div className="flex justify-between items-center w-full lg:w-auto gap-3">
        <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">SwiftShop</div>

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

        {/* Toggle Button for Mobile View */}
        <button
          onClick={() => setShowLinks(!showLinks)}
          className="lg:hidden focus:outline-none text-blue-200 hover:text-white p-2"
        >
          {showLinks ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Responsive Navigation Links */}
      <ul className={`lg:flex lg:flex-row items-center font-semibold text-lg ${showLinks ? 'block' : 'hidden'} gap-4 w-full lg:w-auto`}>
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

        {/* Home Icon */}
        <li>
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-amber-800 dark:hover:bg-stone-800"
            title="Home"
          >
            <FiHome size={20} />
            <span className="lg:hidden">Home</span>
          </Link>
        </li>

        {/* Cart Icon with live badge */}
        <li className="relative">
          <Link 
            to="/cart" 
            className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-amber-800 dark:hover:bg-stone-800"
            title="Shopping Cart"
          >
            <div className="relative">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center animate-pulse"
                  aria-live="polite"
                  aria-label={`Cart items: ${cartCount}`}
                >
                  {cartCount}
                </span>
              )}
            </div>
            <span className="lg:hidden">Cart</span>
          </Link>
        </li>

        {/* Wishlist Icon with live badge */}
        <li className="relative">
          <Link 
            to="/wishlist" 
            className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-amber-800 dark:hover:bg-stone-800"
            title="Wishlist"
          >
            <div className="relative">
              <FiHeart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-rose-600 text-white text-xs font-semibold flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="lg:hidden">Wishlist</span>
          </Link>
        </li>

        {/* Profile Icon with Dropdown */}
        <li className="relative">
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 text-blue-200 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-amber-800 dark:hover:bg-stone-800 focus:outline-none"
              title={isAuthenticated ? `Profile - ${user}` : 'User Profile'}
            >
              <FiUser size={20} />
              <span className="lg:hidden">Profile</span>
            </button>

            {/* Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                <div className="py-2">
                  {isAuthenticated ? (
                    <>
                      {/* User Info */}
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">
                          Welcome!
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user}
                        </p>
                      </div>
                      
                      {/* Profile Link */}
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <FiUser className="mr-3" size={16} />
                        My Profile
                      </Link>

                      {/* Logout */}
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
                      {/* Login */}
                      <Link
                        to="/login"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        <FiUser className="mr-3" size={16} />
                        Login
                      </Link>

                      {/* Sign Up (if you have register page) */}
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
        <li className="flex items-center mx-2 my-3">
          <Switcher />
        </li>
      </ul>

      {/* Overlay to close dropdown when clicking outside */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        ></div>
      )}
    </div>
  );
}
