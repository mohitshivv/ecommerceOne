// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { REACT_APP_PRODUCT_DETAILS_API } from '../utils';
// import ProductDetailsShimmer from '../shimmerUI/ProductDetailsShimmer';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../redux/cartSlice';
// import { toggleWishlist } from '../redux/wishlistSlice';


// const ProductDetails = () => {
// const { id } = useParams();
// const [product, setProduct] = useState(null);

// const isLoggedIn = localStorage.getItem('login');

// useEffect(() => {
// let cancelled = false;
// async function fetchData() {
// try {
// const res = await fetch(REACT_APP_PRODUCT_DETAILS_API + id);
// const result = await res.json();
// if (!cancelled) setProduct(result);
// } catch (err) {
// console.log('error in fetching product details', err);
// swal('Oops!', 'Some API Error!', 'error');
// }
// }
// fetchData();
// return () => { cancelled = true; };
// }, [id]);

// const dispatch = useDispatch();
// const navigate = useNavigate();

// const handleAddToCart = () => {
// if (isLoggedIn === 'true') {
// dispatch(addToCart(product));
// } else {
// swal('Oops!', 'You are not logged in, first login!', 'error')
// .then(() => navigate('../login'));
// }
// };

// const handleAddToWishlist = () => {
// if (isLoggedIn === 'true') {
// dispatch(toggleWishlist(product));
// } else {
// swal('Oops!', 'You are not logged in, first login!', 'error')
// .then(() => navigate('../login'));
// }
// };


// if (!product) return <ProductDetailsShimmer />;

// return (
// <div className="mx-atuo py-8 dark:text-white dark:bg-gray-900 min-h-[100vh]">
// <div className="flex flex-col justify-center lg:flex-row mx-auto">
// <div className="lg:w-1/4 w-3/4 mx-auto flex items-center justify-center">
// <img src={product.image} alt={product.title} className="w-1/2 lg:w-full h-auto mb-4 lg:mb-0" />
// </div>
// <div className="lg:w-1/2 px-8 dark:bg-gray-900 dark:text-white">
// <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
// <p className="text-gray-700 dark:text-gray-300 mb-4">
// {product.description}
// </p>
// <p className="text-2xl font-bold mb-4">${product.price}</p>
// <div className="mb-4">
// <span className="text-gray-600 dark:text-gray-400">Rating:</span>{' '}
// {product?.rating?.rate} ({product?.rating?.count} reviews)
// </div>
// <div className="flex flex-col lg:flex-row">
// <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-2 lg:mr-2 lg:mb-0" onClick={handleAddToCart} >
// Add to Cart
// </button>
// <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddToWishlist} >
// Add to Wishlist
// </button>
// </div>
// </div>
// </div>
// </div>
// );
// };

// export default ProductDetails;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { REACT_APP_PRODUCT_DETAILS_API } from '../utils';
import ProductDetailsShimmer from '../shimmerUI/ProductDetailsShimmer';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';

const ProductDetails = () => {
const { id } = useParams();
const [product, setProduct] = useState(null);

const dispatch = useDispatch();
const navigate = useNavigate(); // kept in case you navigate elsewhere later

useEffect(() => {
let cancelled = false;
async function fetchData() {
try {
const res = await fetch(REACT_APP_PRODUCT_DETAILS_API + id);
const result = await res.json();
if (!cancelled) setProduct(result);
} catch (err) {
console.log('error in fetching product details', err);
// If you use swal elsewhere, keep it, otherwise comment/remove
// swal('Oops!', 'Some API Error!', 'error');
}
}
fetchData();
return () => {
cancelled = true;
};
}, [id]);

const handleAddToCart = () => {
if (!product) return;
dispatch(addToCart(product));
};

const handleAddToWishlist = () => {
if (!product) return;
dispatch(toggleWishlist(product));
};

if (!product) return <ProductDetailsShimmer />;

return (
<div className="mx-atuo py-8 dark:text-white dark:bg-gray-900 min-h-[100vh]">
<div className="flex flex-col justify-center lg:flex-row mx-auto">
<div className="lg:w-1/4 w-3/4 mx-auto flex items-center justify-center">
<img src={product.image} alt={product.title} className="w-1/2 lg:w-full h-auto mb-4 lg:mb-0" />
</div>


    <div className="lg:w-1/2 px-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      <p className="text-gray-700 dark:text-gray-300 mb-4">
        {product.description}
      </p>

      <p className="text-2xl font-bold mb-4">${product.price}</p>

      <div className="mb-4">
        <span className="text-gray-600 dark:text-gray-400">Rating:</span>{' '}
        {product?.rating?.rate ?? 'N/A'} ({product?.rating?.count ?? 0} reviews)
      </div>

      <div className="flex flex-col lg:flex-row">
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-2 lg:mr-2 lg:mb-0"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddToWishlist}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  </div>
</div>
);
};

export default ProductDetails;