// src/components/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { REACT_APP_PRODUCT_DETAILS_API } from '../utils';
import ProductDetailsShimmer from '../shimmerUI/ProductDetailsShimmer';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';
import { FaStar, FaHeart } from 'react-icons/fa'; // Added icons

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart and wishlist from Redux
  const cartItems = useSelector((state) => state.cart.items || []);
  const wishlistItems = useSelector((state) => state.wishlist.items || []);

  // Check if product is in cart or wishlist
  const inCart = product ? cartItems.some((item) => item.id === product.id) : false;
  const inWishlist = product ? wishlistItems.some((item) => item.id === product.id) : false;

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      try {
        const res = await fetch(REACT_APP_PRODUCT_DETAILS_API + id);
        const result = await res.json();
        if (!cancelled) setProduct(result);
      } catch (err) {
        console.log('Error in fetching product details', err);
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

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    dispatch(toggleWishlist(product));
  };

  if (!product) return <ProductDetailsShimmer />;

  // Calculate original price (20% higher if not provided)
  const price = product.price;
  const originalPrice = product.originalPrice || price * 1.25;
  const isDiscounted = originalPrice > price;

  return (
    <div className="mx-auto py-8 dark:text-white dark:bg-gray-900 min-h-[100vh]">
      <div className="flex flex-col lg:flex-row gap-10 mx-auto max-w-6xl px-4">
        {/* Image */}
        <div className="lg:w-1/3 w-full flex justify-center">
          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto max-w-xs lg:max-w-none rounded-xl shadow-lg object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-2/3 space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            {product.title}
          </h1>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              ${price?.toFixed(2)}
            </span>
            {isDiscounted && (
              <span className="text-lg text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            {isDiscounted && (
              <span className="text-sm bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded">
                Save ${(originalPrice - price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Rating with Star Icon */}
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-amber-500">
              <FaStar className="h-5 w-5" />
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {product.rating?.rate?.toFixed(1) ?? 'N/A'}
              </span>
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          {/* Category */}
          <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            <strong>Category:</strong> {product.category || 'Uncategorized'}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            {/* Add to Cart */}
            {inCart ? (
              <button
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center"
                onClick={handleGoToCart}
              >
                🛒 Go to Cart
              </button>
            ) : (
              <button
                className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center"
                onClick={handleAddToCart}
              >
                ➕ Add to Cart
              </button>
            )}

            {/* Wishlist Button */}
            <button
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition ${
                inWishlist
                  ? 'border-rose-600 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
              onClick={handleAddToWishlist}
            >
              <FaHeart className={`h-5 w-5 ${inWishlist ? 'fill-rose-600' : ''}`} />
              {inWishlist ? 'Remove' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;