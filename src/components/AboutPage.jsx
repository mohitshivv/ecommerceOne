// src/components/AboutPage.jsx
//AboutPage.jsx
import React, { useState } from 'react';
import useScrollToHash from '../utils/useScrollToHash';

export default function AboutPage() {
  useScrollToHash(64); 
const [open, setOpen] = useState(false);
const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
const [loading, setLoading] = useState(false);
const [sent, setSent] = useState(false);

const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

const onSubmit = async (e) => {
e.preventDefault();
setLoading(true);
try {
// TODO: integrate with email/API (Formspree, Formcarry, or your backend)
await new Promise((r) => setTimeout(r, 900));
setSent(true);
setForm({ name: '', email: '', subject: '', message: '' });
} finally {
setLoading(false);
}
};

return (
<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
{/* Hero */}
<section id="top" className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-900 to-amber-700 dark:from-stone-900 dark:to-stone-800 p-8 sm:p-12 shadow-sm">
<div className="max-w-3xl">
<h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
Elevate everyday shopping with SwiftShop
</h1>
<p className="mt-4 text-amber-50/90 dark:text-gray-200">
Discover curated products across tech, fashion, and home—crafted for ease, value, and style. Experience fast checkout, secure payments, and responsive support.
</p>
<div className="mt-6 flex gap-3">
<a href="/" className="inline-flex items-center justify-center rounded-lg bg-white/10 text-white px-4 py-2 text-sm font-semibold ring-1 ring-white/30 hover:bg-white/20 transition" >
Explore now
</a>
<button 
onClick={() => setOpen(true)}
className="inline-flex items-center justify-center rounded-lg bg-amber-100 text-amber-900 px-4 py-2 text-sm font-semibold hover:bg-white transition"
>
Contact us
</button>
</div>
</div>
<div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/20 blur-2xl" />
<div className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
</section>

  {/* About */}
  <section id="About" className="mt-12 grid gap-8 lg:grid-cols-3">
    <div className="lg:col-span-2">
      <h2 className="text-2xl font-bold">About us</h2>
      <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">
        SwiftShop blends premium selection with an effortless journey from browse to buy. The catalog spans feature-packed electronics, trend-forward apparel, and thoughtfully designed home goods—handpicked for quality and value.
      </p>
      <p className="mt-4 leading-7 text-gray-700 dark:text-gray-300">
        The mission is simple: reliable products, transparent pricing, and support that genuinely helps. From secure checkout to quick delivery, every touchpoint is crafted to feel smooth and trustworthy.
      </p>

      {/* Highlights */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Feature
          title="Curated quality"
          desc="Products vetted for durability, design, and value—so choosing becomes easy."
          icon="✅"
        />
        <Feature
          title="Fast & secure"
          desc="Encrypted payments, quick checkout, and timely order updates."
          icon="⚡"
        />
        <Feature
          title="Friendly support"
          desc="Responsive help for returns, exchanges, and product guidance."
          icon="💬"
        />
        <Feature
          title="Sustainable picks"
          desc="Growing selection from responsible brands and eco-conscious materials."
          icon="🌿"
        />
      </div>
    </div>

    {/* Team card */}
    <aside className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-6">
      <h3 className="text-xl font-semibold">Our team</h3>
      <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
        A small, focused crew of product curators, engineers, and support specialists, working to make everyday shopping feel delightful and dependable.
      </p>
      <ul className="mt-5 space-y-3 text-sm">
        <li className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">M</span>
          <div>
            <div className="font-medium">Mohit</div>
            <div className="text-gray-500 dark:text-gray-400">Product curation</div>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">V</span>
          <div>
            <div className="font-medium">Vaibhav</div>
            <div className="text-gray-500 dark:text-gray-400">Engineering</div>
          </div>
        </li>
        <li className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white font-bold">S</span>
          <div>
            <div className="font-medium">Sky</div>
            <div className="text-gray-500 dark:text-gray-400">Customer success</div>
          </div>
        </li>
      </ul>
    </aside>
  </section>

  {/* Contact teaser */}
  {/* <section className="mt-12 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900 shadow-sm">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h3 className="text-xl font-semibold">Contact us</h3>
        <p className="mt-1 text-gray-700 dark:text-gray-300">
          Questions, feedback, or partnership ideas—drop a note and the team will reply soon.
        </p>
      </div>
      <div className="flex gap-3">
        <a
          href="mailto:support@swiftshop.com"
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Email support
        </a>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center rounded-lg bg-amber-600 text-white px-4 py-2 text-sm font-semibold hover:bg-amber-700 shadow"
        >
          Open contact form
        </button>
      </div>
    </div>
  </section> */}

  {/* Contact modal */}
  {open && (
    <div className="fixed inset-0 z-">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => {
          setOpen(false);
          setSent(false);
        }}
      />
      <div className="absolute left-1/2 top-1/2 w-[95vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl p-6">
        <div className="flex items-start justify-between">
          <h4 className="text-lg font-semibold">Send a message</h4>
          <button
            onClick={() => {
              setOpen(false);
              setSent(false);
            }}
            className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {sent ? (
          <div className="mt-6 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 text-emerald-800 dark:text-emerald-200">
            Thanks—message received. The team will reply soon.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={onChange}
                  required
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={onChange}
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="I’d like to know about…"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={onChange}
                required
                className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600"
                placeholder="Write a brief message…"
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By sending, consent is given to be contacted about this request.
              </p>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-lg bg-amber-600 text-white px-4 py-2 text-sm font-semibold hover:bg-amber-700 disabled:opacity-60"
              >
                {loading ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )}
</div>
);
}

function Feature({ title, desc, icon }) {
return (
<div className="rounded-xl border border-gray-200 dark:border-gray-800 p-5 bg-white dark:bg-gray-900 shadow-sm">
<div className="text-2xl">{icon}</div>
<div className="mt-2 text-base font-semibold">{title}</div>
<p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{desc}</p>
</div>
);
}