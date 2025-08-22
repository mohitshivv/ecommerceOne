import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveAddress } from '../redux/checkoutSlice';
import { useNavigate } from 'react-router-dom';

export default function AddressForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const saved = useSelector(s => s.checkout.address);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'India',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (saved) setForm(saved);
  }, [saved]);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!/^\d{10}$/.test(form.phone.trim())) e.phone = 'Enter 10-digit phone';
    if (!form.address1.trim()) e.address1 = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    if (!/^\d{5,6}$/.test(form.zip.trim())) e.zip = 'Enter valid PIN/ZIP';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(saveAddress(form));
    navigate('/checkout/payment');
  };

  const onChange = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: '' }));
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shipping Address</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Step 1 of 2</p>

        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Full Name</label>
            <input className={`w-full rounded border px-3 py-2 dark:bg-gray-700 ${errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              value={form.fullName} onChange={e => onChange('fullName', e.target.value)} />
            {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input className={`w-full rounded border px-3 py-2 dark:bg-gray-700 ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              value={form.phone} onChange={e => onChange('phone', e.target.value)} />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">ZIP / PIN</label>
            <input className={`w-full rounded border px-3 py-2 dark:bg-gray-700 ${errors.zip ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              value={form.zip} onChange={e => onChange('zip', e.target.value)} />
            {errors.zip && <p className="text-xs text-red-600 mt-1">{errors.zip}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Address Line 1</label>
            <input className={`w-full rounded border px-3 py-2 dark:bg-gray-700 ${errors.address1 ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              value={form.address1} onChange={e => onChange('address1', e.target.value)} />
            {errors.address1 && <p className="text-xs text-red-600 mt-1">{errors.address1}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Address Line 2 (optional)</label>
            <input className="w-full rounded border px-3 py-2 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              value={form.address2} onChange={e => onChange('address2', e.target.value)} />
          </div>

          <div>
            <label className="block text-sm mb-1">City</label>
            <input className={`w-full rounded border px-3 py-2 dark:bg-gray-700 ${errors.city ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              value={form.city} onChange={e => onChange('city', e.target.value)} />
            {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">State</label>
            <input className={`w-full rounded border px-3 py-2 dark:bg-gray-700 ${errors.state ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
              value={form.state} onChange={e => onChange('state', e.target.value)} />
            {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Country</label>
            <input disabled className="w-full rounded border px-3 py-2 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              value={form.country} onChange={e => onChange('country', e.target.value)} />
          </div>

          <div className="md:col-span-2 flex justify-between mt-4">
            <button type="button" onClick={() => navigate('/cart')} className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600">
              Back to Cart
            </button>
            <button type="submit" className="px-6 py-2 rounded bg-amber-600 hover:bg-amber-700 text-white">
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
