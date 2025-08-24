// import React from 'react';
// import { Link } from 'react-router-dom';

// const ShowProduct = ({ data }) => {
//   return (
//     <div className="max-w-sm w-sm w-[250px] lg:w-[325px] rounded overflow-hidden shadow-lg mb-5 mx-8 border border-gray-200 hover:scale-105 duration-150 hover:shadow-2xl dark:border-gray-700">

//       <Link to={`/productdetails/${data.id}`}>
//         <div className="w-full flex justify-center">
//           <img
//             className="w-full p-2 lg:p-0  lg:w-full  aspect-[1] bg-blend-multiply"
//             // className="w-full h-60 object-cover"

//             src={data.image}
//             alt={data.category}
//           />
//         </div>
//       </Link>

//       <div className="px-6 py-2 dark:bg-gray-800">
//         <div className="font-bold text-xl text-gray-800 dark:text-white">
//           {data.title}
//         </div>
//         <p className="text-gray-700 text-base dark:text-gray-300">
//           {data.category}
//         </p>
//         <div className="font-bold text-md text-gray-800 dark:text-white">
//           $ {data.price}
//         </div>
//       </div>

//       <div className="px-6 py-2 dark:bg-gray-800">
//         <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-white mr-2">
//           {data.rating.rate} ⭐
//         </span>
//         <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-white mr-2">
//           {data.rating.count} Ratings
//         </span>
//       </div>
//     </div>
//   );
// };

// export default ShowProduct;
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';

// Format price as currency
function currency(n) {
  const num = Number(n || 0);
  return `$${num.toFixed(2)}`;
}

export default function ShowProduct({
  data,
  onToggleWishlist, // optional: parent can pass a handler
  isWishlisted = false, // optional: parent can pass boolean
  inStock = true, // optional: pass actual stock if available
}) {
  // If originalPrice is not provided, assume MRP is 25% higher than current price
  const price = Number(data?.price || 0);
  const originalPrice = data?.originalPrice ?? (price ? price * 1.25 : null);
  const ratingValue = Number(data?.rating?.rate || 0);
  const ratingCount = Number(data?.rating?.count || 0);

  return (
    <div className="group relative max-w-sm w-[250px] lg:w-[325px] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10 mb-5 mx-8 will-change-transform">
      {/* Heart / Wishlist button */}
      <button
        type="button"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onToggleWishlist) onToggleWishlist(data);
        }}
        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className={`absolute right-3 top-3 z-10 rounded-full p-2 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md ${
          isWishlisted ? 'text-rose-600' : 'text-gray-500 dark:text-gray-300'
        }`}
      >
        <FaHeart className={`h-5 w-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
      </button>

      {/* Image */}
      <Link to={`/productdetails/${data?.id}`}>
        <div className="w-full flex justify-center relative overflow-hidden bg-gray-50 dark:bg-gray-700">
          <img
            className="w-full p-2 lg:p-0 lg:w-full aspect-square transition-transform duration-500 ease-out group-hover:scale-105"
            src={data?.image}
            alt={data?.title || data?.category || 'Product image'}
            loading="lazy"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="px-5 py-3">
        <Link to={`/productdetails/${data?.id}`} className="block">
          <h3 className="font-semibold text-[15px] lg:text-base text-gray-900 dark:text-gray-100 line-clamp-2">
            {data?.title}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
          {data?.category}
        </p>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            <FaStar className="h-3.5 w-3.5" />
            {ratingValue.toFixed(1)}
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            ({ratingCount} reviews)
          </span>
        </div>

        {/* Price block */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {currency(price)}
          </span>

          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-500 line-through">
              {currency(originalPrice)}
            </span>
          )}

          <span className={`ml-auto text-sm ${inStock ? 'text-green-600' : 'text-red-600'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Optional chips shown on hover */}
      <div className="px-5 pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
        <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-xs font-medium text-gray-700 dark:text-white mr-2">
          {ratingValue.toFixed(1)} ⭐
        </span>
        <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-xs font-medium text-gray-700 dark:text-white">
          {ratingCount} reviews
        </span>
      </div>
    </div>
  );
}