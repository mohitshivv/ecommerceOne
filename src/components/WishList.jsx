import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist, toggleWishlist, clearWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

export default function WishList() {
const dispatch = useDispatch();
const items = useSelector((s) => s?.wishlist?.items || []);

const handleAddAllToCart = () => {
if (!items.length) return;
// Add each wishlist item to cart
items.forEach((p) => dispatch(addToCart(p)));
// If you want to also clear wishlist after adding to cart, uncomment next line:
dispatch(clearWishlist());
};

const handleClearWishlist = () => {
if (!items.length) return;
dispatch(clearWishlist());
};

if (!items.length) {
return (
<div className="max-w-4xl mx-auto p-6 text-gray-700 dark:text-gray-300">
<h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Wishlist</h1>
<p>Your wishlist is empty.</p>
<Link to="/" className="inline-block mt-4 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700" >
Continue shopping
</Link>
</div>
);
}

return (
<div className="max-w-6xl mx-auto p-6">
<div className="flex items-center justify-between gap-4 mb-4">
<h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Wishlist</h1>


    <div className="flex items-center gap-3">
      <button
        onClick={handleAddAllToCart}
        className="px-4 py-2 text-sm rounded bg-amber-600 text-white hover:bg-amber-700"
        title="Add all wishlist items to cart"
      >
        Add all to cart
      </button>

      <button
        onClick={handleClearWishlist}
        className="px-4 py-2 text-sm rounded border border-rose-600 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
        title="Clear wishlist"
      >
        Clear wishlist
      </button>
    </div>
  </div>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((p) => (
      <div
        key={p.id}
        className="border dark:border-gray-700 rounded p-4 bg-white dark:bg-gray-900 flex flex-col"
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
          <h3 className="mt-3 font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
            {p.title}
          </h3>
        </Link>

        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 capitalize">
          {p.category || ''}
        </div>

        <div className="mt-2 font-bold text-gray-900 dark:text-gray-100">
          ${p.price}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            className="px-3 py-2 text-sm rounded bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={() => dispatch(addToCart(p))}
            title="Add to cart"
          >
            Add to cart
          </button>

          <button
            className="px-3 py-2 text-sm rounded border border-rose-600 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
            onClick={() => dispatch(removeFromWishlist(p.id))}
            title="Remove from wishlist"
          >
            Remove
          </button>

          
        </div>
      </div>
    ))}
  </div>
</div>
);
}