import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaXTwitter, FaInstagram } from 'react-icons/fa6';

export default function Footer() {
const [email, setEmail] = useState('');
const [status, setStatus] = useState({ type: '', msg: '' });
const [loading, setLoading] = useState(false);

const isValidEmail = (v) =>
/^[^\s@]+@[^\s@]+.[^\s@]+$/.test(String(v).toLowerCase());

const handleSubscribe = async (e) => {
e.preventDefault();
setStatus({ type: '', msg: '' });

text
if (!isValidEmail(email)) {
  setStatus({ type: 'error', msg: 'Please enter a valid email.' });
  return;
}

try {
  setLoading(true);
  // TODO: Replace this with your newsletter API call
  // await fetch('/api/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
  await new Promise((r) => setTimeout(r, 700)); // simulate network
  setStatus({ type: 'success', msg: 'Subscribed successfully!' });
  setEmail('');
} catch (err) {
  setStatus({ type: 'error', msg: 'Something went wrong. Please try again.' });
} finally {
  setLoading(false);
}
};

return (
<footer className="mt-16 bg-gradient-to-b from-rose-50 to-white dark:from-gray-800 dark:to-gray-900 border-t border-gray-200/70 dark:border-gray-700/60">
<div className="max-w-7xl mx-auto px-4 py-12">
<div className="grid grid-cols-1 md:grid-cols-4 gap-10">
{/* Brand */}
<div className="md:col-span-1">
<Link to="/" aria-label="ULtrastore Home">
<h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
Swiftshop
</h2>
</Link>
<p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
Your one‑stop shop for amazing products. Quality guaranteed.
</p>
</div>

      {/* Quick Links */}
      <nav className="md:col-span-1" aria-label="Quick Links">
        <h3 className="text-sm tracking-wide uppercase text-gray-600 dark:text-gray-400 mb-4">
          Quick Links
        </h3>
        <ul className="space-y-3 text-gray-900 dark:text-gray-200">
          <li><Link className="hover:text-violet-600" to="/">Home</Link></li>
          <li><Link className="hover:text-violet-600" to="/shop">Shop All</Link></li>
          <li><Link className="hover:text-violet-600" to="/about">About Us</Link></li>
          <li><Link className="hover:text-violet-600" to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Support */}
      <nav className="md:col-span-1" aria-label="Support">
        <h3 className="text-sm tracking-wide uppercase text-gray-600 dark:text-gray-400 mb-4">
          Support
        </h3>
        <ul className="space-y-3 text-gray-900 dark:text-gray-200">
          <li><Link className="hover:text-violet-600" to="/faq">FAQ</Link></li>
          <li><Link className="hover:text-violet-600" to="/shipping-returns">Shipping & Returns</Link></li>
          <li><Link className="hover:text-violet-600" to="/privacy">Privacy Policy</Link></li>
          <li><Link className="hover:text-violet-600" to="/terms">Terms of Service</Link></li>
        </ul>
      </nav>

      {/* Social + Newsletter */}
      <div className="md:col-span-1">
        <h3 className="text-sm tracking-wide uppercase text-gray-600 dark:text-gray-400 mb-4">
          Stay Connected
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="p-2 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-gray-600"
          >
            <FaFacebook className="h-5 w-5" />
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="p-2 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-gray-600"
          >
            <FaXTwitter className="h-5 w-5" />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="p-2 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-gray-600"
          >
            <FaInstagram className="h-5 w-5" />
          </a>
        </div>

        <form onSubmit={handleSubscribe} className="mt-4">
          <label htmlFor="newsletter-email" className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
            Subscribe to our newsletter:
          </label>
          <div className="flex">
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="flex-1 rounded-l-md border border-gray-300 dark:border-gray-600 px-3 py-2 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-describedby="newsletter-help"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-r-md bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 disabled:opacity-70"
            >
              {loading ? 'Subscribing…' : 'Subscribe'}
            </button>
          </div>
          <p id="newsletter-help" className="sr-only">Enter your email to subscribe</p>
          {status.msg && (
            <p
              role="status"
              className={`mt-2 text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}
            >
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </div>

    <hr className="my-8 border-gray-200 dark:border-gray-700" />

    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} SwiftShop. All rights reserved.
    </p>
  </div>
</footer>
);
}