import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((s) => s?.cart?.items || []);

  // Compute totals
  const summary = useMemo(() => {
    const totalItems = items.reduce((sum, i) => sum + (i.qty || 0), 0);
    const subtotal = items.reduce((sum, i) => sum + (i.qty || 0) * (i.price || 0), 0);
    return { totalItems, subtotal };
  }, [items]);

  if (!items.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-gray-700 dark:text-gray-300">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Shopping Cart
        </h1>
        <p>Your cart is empty.</p>
        <Link
          to="/"
          className="inline-block mt-4 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-3 gap-6">
      {/* Items list */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Shopping Cart
          </h1>
          <button
            className="px-4 py-2 rounded border border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>

        {items.map((p) => (
          <div
            key={p.id}
            className="flex gap-4 border dark:border-gray-700 rounded p-4 bg-white dark:bg-gray-900"
          >
            <Link to={`/productdetails/${p.id}`}>
              <img
                src={p.image}
                alt={p.title}
                className="h-24 w-24 object-contain"
                loading="lazy"
              />
            </Link>

            <div className="flex-1">
              <Link
                to={`/productdetails/${p.id}`}
                className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2"
              >
                {p.title}
              </Link>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 capitalize">
                {p.category || ''}
              </div>
              <div className="mt-2 font-bold text-gray-900 dark:text-gray-100">${p.price}</div>

              <div className="mt-3 flex items-center gap-3">
                <button
                  className="px-2 py-1 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => dispatch(decrementQuantity(p.id))}
                  title="Decrease"
                >
                  −
                </button>
                <span className="min-w-8 text-center">{p.qty}</span>
                <button
                  className="px-2 py-1 border rounded hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => dispatch(incrementQuantity(p.id))}
                  title="Increase"
                >
                  +
                </button>

                <div className="ml-auto font-semibold">
                  $
                  {(Math.max(0, (p.qty || 0)) * (p.price || 0)).toFixed(2)}
                </div>

                <button
                  className="ml-4 px-3 py-1 text-sm rounded border border-rose-600 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                  onClick={() => dispatch(removeFromCart(p.id))}
                  title="Remove item"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order summary */}
      <div className="border dark:border-gray-700 rounded p-4 bg-white dark:bg-gray-900 h-fit sticky top-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Order Summary</h2>

        <div className="mt-3 flex justify-between text-gray-700 dark:text-gray-300">
          <span>Items</span>
          <span>{summary.totalItems}</span>
        </div>

        <div className="mt-2 flex justify-between text-gray-700 dark:text-gray-300">
          <span>Subtotal</span>
          <span>${summary.subtotal.toFixed(2)}</span>
        </div>

        {/* Proceed button now routes to Address step */}
        <div className="mt-4">
          <button
            onClick={() => navigate('/checkout/address')}
            className="w-full text-center px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Proceed to Checkout
          </button>
        </div>

        {/* Optional: link back to continue shopping */}
        <div className="mt-3 text-center">
          <Link to="/" className="text-sm text-emerald-700 hover:underline">
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
