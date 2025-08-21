
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { userContext } from '../context/UserContext';
import { useSelector, useDispatch } from 'react-redux';
import { setSearch } from '../redux/productsSlice';
import avatar from '/avatar.png';
import Switcher from './Switcher';

export default function Header() {
const [showLinks, setShowLinks] = useState(false);
const { isLoggedIn } = useContext(userContext);

const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();

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
      className="lg:hidden focus:outline-none text-blue-200 hover:text-white"
    >
      {showLinks ? 'Close' : 'Menu'}
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

    <li>
      <Link to="/" className="text-blue-200 hover:text-white">
        Home
      </Link>
    </li>

    {/* Cart with live badge */}
    <li className="relative">
      <Link to="/cart" className="relative inline-block text-blue-200 hover:text-white">
        <span>Cart</span>
        {cartCount > 0 && (
          <span
            className="absolute -top-2 -right-4 min-w-5 h-5 px-1 rounded-full bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center"
            aria-live="polite"
            aria-label={`Cart items: ${cartCount}`}
          >
            {cartCount}
          </span>
        )}
      </Link>
    </li>

    {/* Wishlist with live badge */}
    <li className="relative">
      <Link to="/wishlist" className="relative inline-block text-blue-200 hover:text-white">
        <span>Wishlist</span>
        {wishlistCount > 0 && (
          <span className="absolute -top-2 -right-6 min-w-5 h-5 px-1 rounded-full bg-rose-600 text-white text-xs font-semibold flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </Link>
    </li>

    {(isLoggedIn === 'false' || !isLoggedIn || isLoggedIn == null || isLoggedIn == 'null') ? (
      <li>
        <Link to="/login" className="text-blue-200 hover:text-white">
          Login
        </Link>
      </li>
    ) : (
      <li>
        <Link to="/profile" className="text-blue-200 hover:text-white">
          <img src={avatar} alt="profile" className="rounded-full md:w-1/3 lg:block hidden" />
          <span className="lg:hidden">Profile</span>
        </Link>
      </li>
    )}

    <li className="flex items-center mx-2 my-3">
      <Switcher />
    </li>
  </ul>
</div>
);
}