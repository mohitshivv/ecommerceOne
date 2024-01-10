import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { REACT_APP_PRODUCT_DETAILS_API } from '../utils';
import ProductDetailsShimmer from '../shimmerUI/ProductDetailsShimmer';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { addToWishlist } from '../redux/wishlistSlice';

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState([]);

  const isLoggedIn = localStorage.getItem('login');
  useEffect(() => {
    const fetchData = () => {
      fetch(REACT_APP_PRODUCT_DETAILS_API + id)
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setProduct(result);
        })
        .catch((err) => {
          console.log('error in fetching product details', err)
          alert('Some API error, Try after some time.')
        });
    };

    fetchData();
  }, [id]);


  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddToCart = () => {
    // Implement your logic to add the product to the cart
    console.log('Added to Cart:', product);
    if (isLoggedIn == 'true')
      dispatch(addToCart(product));
    else {
      alert('login first')
      navigate('../login');
    }


  };

  const handleAddToWishlist = () => {
    // Implement your logic to add the product to the wishlist
    console.log('Added to Wishlist:', product);
    if (isLoggedIn == 'true')
      dispatch(addToWishlist(product));
    else {
      alert('login first')
      navigate('../login');
    }
  };

  return product.length === 0 ? (
    <ProductDetailsShimmer />
  ) : (
    <div className="container mx-auto my-8">
      <div className="flex flex-col justify-center lg:flex-row mx-auto ">
        <div className="lg:w-1/4 w-3/4 mx-auto flex items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-auto mb-4 lg:mb-0"
          />
        </div>
        <div className="lg:w-1/2 px-8">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          <div className="mb-4">
            <span className="text-gray-600">Rating:</span>{' '}
            {product.rating.rate} ({product.rating.count} reviews)
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
