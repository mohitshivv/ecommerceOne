import React, { useContext } from 'react';
import { userContext } from '../context/UserContext';
import { useDispatch, useSelector } from 'react-redux';
import ShowProduct from './ShowProduct';
import { clearCart } from '../redux/cartSlice';


export default function Cart() {

  const { isLoggedIn } = useContext(userContext);
  const temp = localStorage.getItem('currentUser')
  let currentUser=[];
  if(temp)
    currentUser = JSON.parse(atob(temp))
  console.log('current user from cart', currentUser)

  // clear cart items
  const dispatch = useDispatch();
  const handleClearCart = () => {
    // alert('clear cart calleld');
    dispatch(clearCart())
  }


  const cartItems = useSelector(store => store.cart.items);
  console.log('cart items', cartItems);


  const currentUserData = [];
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].userId == currentUser.id) {
      currentUserData.push(cartItems[i]);
    }
  }
  console.log('current user data form cart', currentUserData);


  return currentUserData.length == 0 ? 
    (<div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-bounce">Oops! No product found</h1>
        <p className="text-gray-600">Please add some products.</p>
      </div>
    </div>) : (
    <div>

      <div className="container flex flex-wrap justify-center mx-auto my-10">

        {currentUserData.map((item, index) => (

          <ShowProduct data={item} key={item.id} />
        ))}
      </div>

      <div className="flex justify-center mx-auto my-5 w-full">

        <button
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/4"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>

    </div>
  )
}
