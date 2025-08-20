import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderCarousel from './HeaderCarousel';
import Filter from './Filter';
import AboutPage from './AboutPage';
const Stars = ({ value = 0 }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const total = 5;
  return (
  <span className="inline-flex items-center text-yellow-500">
  {Array.from({ length: total }).map((_, i) => {
  if (i < full) return <span key={i}>★</span>;
  if (i === full && half) return <span key={i}>☆</span>;
  return <span key={i} className="text-gray-300 dark:text-gray-600">★</span>;
  })}
  </span>
  );
  };

export default function Home() {
const dispatch = useDispatch();

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [err, setErr] = useState(null);

// Add state to keep track of current filter selection
const [filters, setFilters] = useState({ category: 'All', price: 'All', rating: 'All' });

const search = useSelector((s) => s?.products?.search || '');

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

const filtered = useMemo(() => {
  let list = Array.isArray(products) ? products : [];
  // Apply search filter
  const q = (search || '').toLowerCase();
  if (q) {
  list = list.filter((p) => (p?.title || '').toLowerCase().includes(q));
  }
  // Apply category filter
  if (filters.category && filters.category !== 'All') {
  list = list.filter((p) => p.category === filters.category);
  }
  // Apply price filter
  if (filters.price && filters.price !== 'All') {
  const maxPrice = Number(filters.price);
  list = list.filter((p) => p.price <= maxPrice);
  }
  // Apply rating filter
  if (filters.rating && filters.rating !== 'All') {
  const minRating = Number(filters.rating);
  list = list.filter((p) => p?.rating?.rate >= minRating);
  }
  return list;
  }, [products, search, filters]);

return (
<div className="max-w-7xl mx-auto px-4 py-4">
<div className="mb-6">
<HeaderCarousel />
</div>


  <div className="mb-4">
  <Filter products={products} handleFilter={setFilters} />
</div>


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

  {!loading && !err && (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filtered.map((p) => (
        <div
          key={p.id}
          className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded p-4 shadow-sm"
        >
          <Link to={`/productdetails/${p.id}`} className="block">
            <div className="w-full h-40 flex items-center justify-center">
              <img
                src={p.image}
                alt={p.title}
                className="max-h-40 object-contain"
                loading="lazy"
              />
            </div>
          </Link>

          <Link to={`/productdetails/${p.id}`} className="block">
            <h3 className="mt-3 font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
              {p.title}
            </h3>
          </Link>

          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 capitalize">
            {p.category}
          </div>

          <div className="mt-2 font-bold text-gray-900 dark:text-gray-100">
            ${p.price}
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"> <Stars value={p?.rating?.rate ?? 0} /> <span className="text-xs text-gray-500">({p?.rating?.count ?? 0})</span>
           </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="col-span-full text-center text-gray-600 dark:text-gray-400 py-16">
          No products match the current search.
        </div>
      )}
    </div>
  )}
  <AboutPage />
</div>
);
}