import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePayment, setOrderId } from '../redux/checkoutSlice';
import { useNavigate } from 'react-router-dom';

export default function PaymentForm() {
const navigate = useNavigate();
const dispatch = useDispatch();
const address = useSelector((s) => s.checkout.address);
const cartItems = useSelector((s) => s.cart.items || []);

const [form, setForm] = useState({
method: 'card', // 'card' | 'upi' | 'cod'
cardName: '',
cardNumber: '',
expiry: '',
cvv: '',
upiId: '',
});
const [errors, setErrors] = useState({});

useEffect(() => {
// Must have address first
if (!address) navigate('/checkout/address');
}, [address, navigate]);

const onChange = (k, v) => {
setForm((prev) => ({ ...prev, [k]: v }));
if (errors[k]) setErrors((prev) => ({ ...prev, [k]: '' }));
};

const validate = () => {
const e = {};
if (form.method === 'card') {
if (!form.cardName.trim()) e.cardName = 'Required';
if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) e.cardNumber = 'Enter 16-digit card';
if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'MM/YY';
if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = '3–4 digits';
} else if (form.method === 'upi') {
if (!/^[\w.-]+@[\w-]+$/.test(form.upiId)) e.upiId = 'Enter valid UPI ID';
}
setErrors(e);
return Object.keys(e).length === 0;
};

const placeOrder = (e) => {
e.preventDefault();

// If you enforce a non-empty cart, uncomment this guard and seed a cart item in the test
// if (!cartItems.length) return;

if (!validate()) return;

dispatch(savePayment({ method: form.method }));
const id = 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase();
dispatch(setOrderId(id));

navigate('/checkout/success', { replace: true, state: { id } });
};

const cartTotal = cartItems.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);

return (
<div className="min-h-[80vh] bg-gray-50 dark:bg-gray-900 py-10 px-4">
<div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6">
<h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment</h1>
<p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Step 2 of 2</p>


    {/* Order summary mini */}
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
      <p className="text-sm text-gray-700 dark:text-gray-200">
        Deliver to: <strong>{address?.fullName}</strong>, {address?.address1}, {address?.city} {address?.zip}
      </p>
      <p className="text-sm text-gray-700 dark:text-gray-200 mt-1">
        Total: <strong>₹{cartTotal.toFixed(2)}</strong>
      </p>
    </div>

    <form onSubmit={placeOrder} className="space-y-5">
      {/* Method selector (accessible radios) */}
      <div>
        <div role="radiogroup" aria-label="Payment Method" className="space-y-3">
          {[
            { key: 'card', label: 'Credit/Debit Card' },
            { key: 'upi', label: 'UPI' },
            { key: 'cod', label: 'Cash on Delivery' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-3">
              <input
                id={`pay-${key}`}
                type="radio"
                name="method"
                value={key}
                checked={form.method === key}
                onChange={() => onChange('method', key)}
                className="h-4 w-4"
              />
              <label htmlFor={`pay-${key}`} className="select-none">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Card fields */}
      {form.method === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="cardName" className="block text-sm mb-1">Name on Card</label>
            <input
              id="cardName"
              className={`w-full rounded border px-3 py-2 dark:bg-gray-700 ${
                errors.cardName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              value={form.cardName}
              onChange={(e) => onChange('cardName', e.target.value)}
            />
            {errors.cardName && <p className="text-xs text-red-600 mt-1">{errors.cardName}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="cardNumber" className="block text-sm mb-1">Card Number</label>
            <input
              id="cardNumber"
              maxLength={19}
              placeholder="1234123412341234"
              className={`w-full rounded border px-3 py-2 dark:bg-gray-700 ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              value={form.cardNumber}
              onChange={(e) => onChange('cardNumber', e.target.value.replace(/\s/g, ''))}
            />
            {errors.cardNumber && <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>}
          </div>

          <div>
            <label htmlFor="expiry" className="block text-sm mb-1">Expiry (MM/YY)</label>
            <input
              id="expiry"
              placeholder="08/28"
              className={`w-full rounded border px-3 py-2 dark:bg-gray-700 ${
                errors.expiry ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              value={form.expiry}
              onChange={(e) => onChange('expiry', e.target.value)}
            />
            {errors.expiry && <p className="text-xs text-red-600 mt-1">{errors.expiry}</p>}
          </div>

          <div>
            <label htmlFor="cvv" className="block text-sm mb-1">CVV</label>
            <input
              id="cvv"
              maxLength={4}
              className={`w-full rounded border px-3 py-2 dark:bg-gray-700 ${
                errors.cvv ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              value={form.cvv}
              onChange={(e) => onChange('cvv', e.target.value)}
            />
            {errors.cvv && <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>}
          </div>
        </div>
      )}

      {/* UPI */}
      {form.method === 'upi' && (
        <div>
          <label htmlFor="upiId" className="block text-sm mb-1">UPI ID</label>
          <input
            id="upiId"
            placeholder="name@bank"
            className={`w-full rounded border px-3 py-2 dark:bg-gray-700 ${
              errors.upiId ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            value={form.upiId}
            onChange={(e) => onChange('upiId', e.target.value)}
          />
          {errors.upiId && <p className="text-xs text-red-600 mt-1">{errors.upiId}</p>}
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate('/checkout/address')}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-6 py-2 rounded bg-amber-600 hover:bg-amber-700 text-white"
        >
          Place Order
        </button>
      </div>
    </form>
  </div>
</div>
);
}