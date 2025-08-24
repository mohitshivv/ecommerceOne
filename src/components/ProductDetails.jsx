import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { REACT_APP_PRODUCT_DETAILS_API } from '../utils';
import ProductDetailsShimmer from '../shimmerUI/ProductDetailsShimmer';
import { addToCart } from '../redux/cartSlice';
import { toggleWishlist } from '../redux/wishlistSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get cart and wishlist from Redux
  const cartItems = useSelector((state) => state.cart.items || []);
  const wishlistItems = useSelector((state) => state.wishlist.items || []); // <-- Added this

  // Check if product is in cart or wishlist
  const inCart = product ? cartItems.some((item) => item.id === product.id) : false;
  const inWishlist = product ? wishlistItems.some((item) => item.id === product.id) : false; // <-- Added this

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

  return (
    <div className="mx-auto py-8 dark:text-white dark:bg-gray-900 min-h-[100vh]">
      <div className="flex flex-col justify-center lg:flex-row mx-auto">
        {/* Image */}
        <div className="lg:w-1/4 w-3/4 mx-auto flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-1/2 lg:w-full h-auto mb-4 lg:mb-0"
          />
        </div>

        {/* Details */}
        <div className="lg:w-1/2 px-8 dark:bg-gray-900 dark:text-white">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>

          <div className="mb-4">
            <span className="text-gray-600 dark:text-gray-400">Rating:</span>{' '}
            {product?.rating?.rate?.toFixed(1) ?? 'N/A'} ({product?.rating?.count ?? 0} reviews)
          </div>

          {/* Add to Cart & Wishlist Buttons */}
          <div className="flex flex-col lg:flex-row gap-2">
            {/* Add to Cart Button */}
            {inCart ? (
              <button
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleGoToCart}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            )}

            {/* Wishlist Button - Changes color when added */}
            <button
              className={`${
                inWishlist
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-800 hover:bg-gray-700'
              } text-white font-bold py-2 px-4 rounded transition-colors duration-200`}
              onClick={handleAddToWishlist}
            >
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;