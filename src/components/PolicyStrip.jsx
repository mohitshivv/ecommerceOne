import React from 'react';
import { FiTruck, FiRotateCcw, FiGift, FiLifeBuoy } from 'react-icons/fi';

export default function PolicyStrip() {
  const items = [
    {
      icon: <FiTruck className="h-7 w-7 text-amber-600" />,
      title: 'Free Shipping',
      subtitle: 'Orders $50 or more',
    },
    {
      icon: <FiRotateCcw className="h-7 w-7 text-amber-600" />,
      title: 'Free Returns',
      subtitle: 'Within 30 days',
    },
    {
      icon: <FiGift className="h-7 w-7 text-amber-600" />,
      title: 'Get 20% Off 1 Item',
      subtitle: 'When you sign up',
    },
    {
      icon: <FiLifeBuoy className="h-7 w-7 text-amber-600" />,
      title: 'We Support',
      subtitle: '24/7 amazing services',
    },
  ];

  return (
    <section className="mt-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <h3 className="text-center text-sm tracking-wide uppercase text-amber-600 mb-6">
          What We Believe
        </h3>

        {/* Cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="shrink-0">{item.icon}</div>
              <div>
                <h4 className="text-gray-900 dark:text-gray-100 font-semibold">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
