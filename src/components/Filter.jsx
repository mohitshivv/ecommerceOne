import React, { useState } from 'react';

function groupBy(arr, criteria) {
const list = Array.isArray(arr) ? arr : [];
return list.reduce((acc, currentValue) => {
const key = currentValue?.[criteria] ?? 'Unknown';
if (!acc[key]) acc[key] = [];
acc[key].push(currentValue);
return acc;
}, {});
}

export default function Filter({ products = [], data, handleFilter }) {
// Support both props: prefer products, fallback to data
const source = Array.isArray(products) ? products : Array.isArray(data) ? data : [];
const category = groupBy(source, 'category');
const categoryList = ['All', ...Object.keys(category)];

const [cate, setCate] = useState('All');
const [price, setPrice] = useState('All');
const [rating, setRating] = useState('All');

const handleSubmit = () => {
if (typeof handleFilter === 'function') {
handleFilter({ category: cate, price, rating });
}
};

return (
<div className="bg-gray-200 dark:bg-gray-800 mb-14 rounded-md shadow-md flex justify-center items-end">
<div className="mb-4 mx-5">
<label htmlFor="category" className="block text-gray-700 dark:text-gray-300 font-bold mb-2 w-1/4">
Category
</label>
<select
id="category"
value={cate}
onChange={(e) => setCate(e.target.value)}
className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md"
>
{categoryList.map((cat, index) => (
<option value={cat} key={index}>
{cat}
</option>
))}
</select>
</div>


  <div className="mb-4 mx-5">
    <label htmlFor="price" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
      Price{'$'}
    </label>
    <select
      id="price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md"
    >
      <option value="All">All</option>
      <option value="10">0-10</option>
      <option value="50">0-50</option>
      <option value="100">0-100</option>
    </select>
  </div>

  <div className="mb-4 mx-5">
    <label htmlFor="rating" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
      Rating
    </label>
    <select
      id="rating"
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-md"
    >
      <option value="All">All</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  </div>

  <div className="mb-4 mx-5">
    <button
      onClick={handleSubmit}
      className="bg-gray-800 dark:bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    >
      Submit
    </button>
  </div>
</div>
);
}

