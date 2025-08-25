import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FaHeart, FaStar } from 'react-icons/fa';

import HeaderCarousel from './HeaderCarousel';
import Filter from './Filter';
import AboutPage from './AboutPage';
import PolicyStrip from './PolicyStrip';
import Footer from './Footer';


/* Small star fallback (not used in the card UI now, kept for compatibility) */
const Stars = ({ value = 0 }) => {
const full = Math.floor(value);
const half = value - full >= 0.5;
const total = 5;
return (
<span className="inline-flex items-center text-yellow-500">
{Array.from({ length: total }).map((_, i) => {
if (i < full) return <span key={i}>★</span>;
if (i === full && half) return <span key={i}>☆</span>;
return (
<span key={i} className="text-gray-300 dark:text-gray-600">
★
</span>
);
})}
</span>
);
};

export default function Home() {
const dispatch = useDispatch();

// Local state
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [err, setErr] = useState(null);

// Current filter selection
const [filters, setFilters] = useState({
category: 'All',
price: 'All',
rating: 'All',
});

// Global search from Redux
const search = useSelector((s) => s?.products?.search || '');

// Wishlist state: expects wishlist.ids to be an array of product IDs
const wishIds = useSelector((s) => s?.wishlist?.ids) || [];

// Fetch products
useEffect(() => {
let cancelled = false;
async function load() {
try {
setLoading(true);
setErr(null);
const res = await fetch('https://fakestoreapi.com/products');
const data = await res.json();
if (!cancelled) setProducts(Array.isArray(data) ? data : []);
} catch (e) {
if (!cancelled) setErr('Failed to load products');
} finally {
if (!cancelled) setLoading(false);
}
}
load();
return () => {
cancelled = true;
};
}, []);

// Apply filters
const filtered = useMemo(() => {
let list = Array.isArray(products) ? products : [];


// Search
const q = (search || '').toLowerCase().trim();
if (q) list = list.filter((p) => (p?.title || '').toLowerCase().includes(q));

// Category
if (filters.category && filters.category !== 'All') {
  list = list.filter((p) => p.category === filters.category);
}

// Price (<= max)
if (filters.price && filters.price !== 'All') {
  const maxPrice = Number(filters.price);
  list = list.filter((p) => p.price <= maxPrice);
}

// Rating (>= min)
if (filters.rating && filters.rating !== 'All') {
  const minRating = Number(filters.rating);
  list = list.filter((p) => p?.rating?.rate >= minRating);
}

return list;
}, [products, search, filters]);

// Show slider only when search is empty
const showSlider = !((search || '').trim());


return (
<div className="max-w-7xl mx-auto px-4 pt-0 pb-4">
{showSlider && (
// Full-bleed slider wrapper: breaks out of centered container, no gaps
<div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] m-0 p-0">
<HeaderCarousel />
</div>
)}


  {/* Filters */}
  <div className="mb-4">
    <Filter products={products} handleFilter={setFilters} />
  </div>

  {/* Async states */}
  {loading && (
    <div className="text-center text-gray-600 dark:text-gray-400 py-10">
      Loading products…
    </div>
  )}
  {err && (
    <div className="text-center text-red-600 dark:text-red-400 py-10">
      {err}
    </div>
  )}

  {/* Product grid */}
  {!loading && !err && (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filtered.map((p) => {
        const price = Number(p.price || 0);
        const mrp = (price / 0.8).toFixed(2); // display-only 20% higher

        const isWished = wishIds.includes(Number(p.id));

        return (
          <div
            key={p.id}
            className="
              group relative rounded-xl overflow-hidden
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800
              transition-transform duration-300 ease-out
              hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10
              will-change-transform
            "
          >
            
            {/* Image */}
            <Link to={`/productdetails/${p.id}`}>
              <div className="w-full flex justify-center overflow-hidden bg-gray-50 dark:bg-gray-700">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="
                    w-full p-3 aspect-square object-contain
                    transition-transform duration-500 ease-out
                    group-hover:scale-[1.05]
                  "
                />
              </div>
            </Link>

            {/* Content */}
            <div className="px-5 py-3">
              {/* Title */}
              <Link to={`/productdetails/${p.id}`}>
                <h3 className="font-semibold text-sm lg:text-base text-gray-900 dark:text-gray-100 line-clamp-2">
                  {p.title}
                </h3>
              </Link>

              {/* Category */}
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 capitalize">
                {p.category}
              </p>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                  <FaStar className="h-3.5 w-3.5" />
                  {Number(p?.rating?.rate || 0).toFixed(1)}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  ({p?.rating?.count ?? 0} reviews)
                </span>
              </div>

              {/* Price block */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  ${price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${mrp}
                </span>
                <span className="ml-auto text-sm text-green-600">
                  In Stock
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <div className="col-span-full text-center text-gray-600 dark:text-gray-400 py-16">
          No products match the current search.
        </div>
      )}
    </div>
  )}

  {/* Extra sections */}
  <AboutPage />

  <div className="dark:bg-gray-900">
    <div className="py-10">
      <PolicyStrip />
    </div>
  </div>

  <Footer />
</div>
);
}