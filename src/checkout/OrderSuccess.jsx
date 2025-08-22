import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCheckout } from '../redux/checkoutSlice';

export default function OrderSuccess() {
  const location = useLocation();
  const orderId = location?.state?.id;
  const dispatch = useDispatch();
  const cartItems = useSelector(s => s.cart.items || []);

  useEffect(() => {
    // Optional: clear cart after success if required
    // dispatch(clearCart());
    dispatch(clearCheckout());
  }, [dispatch]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 max-w-lg w-full text-center">
        <div className="text-4xl">🎉</div>
        <h1 className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
          Order successfully placed!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Your order {orderId ? <strong>#{orderId}</strong> : ''} is on the way.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          You’ll receive an update when it ships.
        </p>

        <div className="mt-6 flex gap-3 justify-center">
          <Link to="/" className="px-5 py-2 rounded bg-amber-600 hover:bg-amber-700 text-white">Continue Shopping</Link>
          <Link to="/orders" className="px-5 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">View Orders</Link>
        </div>
      </div>
    </div>
  );
}
