// import React, { useContext } from 'react';
// import { userContext } from '../context/UserContext';
// import { useDispatch, useSelector } from 'react-redux';
// import ShowProduct from './ShowProduct';
// import { clearWishlist } from '../redux/wishlistSlice';


// export default function WishList() {

//   const { isLoggedIn } = useContext(userContext);
//   const temp = localStorage.getItem('currentUser')

//   let currentUser=[];
//   if(temp && temp!='null')
//     currentUser = JSON.parse(atob(temp))
//   console.log('current user from wishlist', currentUser)


//   // displatch clear wishlist
//   const dispatch = useDispatch();
//   const handleClearWishlist = ()=>{
//     console.log('handle clear list called')
//     dispatch(clearWishlist());
//   }


//   // fetch wishlist data
//   const wishlistItems = useSelector(store => store.wishlist.items);
//   console.log('wishlist items', wishlistItems);

//   const currentUserData = [];
//   for(let i=0;i<wishlistItems.length;i++){
//     if(wishlistItems[i].userId == currentUser.id){
//       currentUserData.push(wishlistItems[i]);
//     }
//   }

//   console.log('current user data from wishlist', currentUserData);

//   return (currentUserData.length == 0) ?
//     (<div className="flex items-center justify-center h-screen dark:bg-gray-900 ">
//     <div className="text-center">
//       <h1 className="text-3xl font-bold text-gray-800 mb-4 animate-bounce  dark:text-white">Oops! No item found in wishlist</h1>
//       <p className="text-gray-600  dark:text-gray-300">Please add some Items.</p>
//     </div>
//   </div>) : (
//     <div className='dark:bg-gray-900 h-[92vh]'>

//       <div className="container flex flex-wrap justify-center mx-auto py-10">

//         {currentUserData.map((item, index) => (

//           <ShowProduct data={item} key={item.id} />
//         ))}

//         <div className="flex justify-center mx-auto my-5 w-full">

//           <button
//             className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-1/4"
//             onClick={handleClearWishlist}
//           >
//             Clear Wishlist
//           </button>
//         </div>

//       </div>

//     </div>
//   )
// }
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist, toggleWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

export default function WishList() {
const dispatch = useDispatch();
const items = useSelector((s) => s?.wishlist?.items || []);

if (!items.length) {
return (
<div className="max-w-4xl mx-auto p-6 text-gray-700 dark:text-gray-300">
<h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Wishlist</h1>
<p>Your wishlist is empty.</p>
<Link to="/" className="inline-block mt-4 px-4 py-2 rounded bg-emerald-600 text-white hover:bg-emerald-700" >
Continue shopping
</Link>
</div>
);
}

return (
<div className="max-w-6xl mx-auto p-6">
<h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Wishlist</h1>


  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((p) => (
      <div
        key={p.id}
        className="border dark:border-gray-700 rounded p-4 bg-white dark:bg-gray-900 flex flex-col"
      >
        <Link to={`/productdetails/${p.id}`} className="block">
          <div className="w-full h-40 flex items-center justify-center">
            <img
              src={p.image}
              alt={p.title}
              className="max-h-40 object-contain"
              loading="lazy"
            />
          </div>
          <h3 className="mt-3 font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
            {p.title}
          </h3>
        </Link>

        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 capitalize">
          {p.category || ''}
        </div>

        <div className="mt-2 font-bold text-gray-900 dark:text-gray-100">
          ${p.price}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            className="px-3 py-2 text-sm rounded bg-emerald-600 text-white hover:bg-emerald-700"
            onClick={() => dispatch(addToCart(p))}
            title="Add to cart"
          >
            Add to cart
          </button>

          <button
            className="px-3 py-2 text-sm rounded border border-rose-600 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20"
            onClick={() => dispatch(removeFromWishlist(p.id))}
            title="Remove from wishlist"
          >
            Remove
          </button>

          {/* Optional: true toggle behavior instead of explicit remove */}
          {/* <button
            className="px-3 py-2 text-sm rounded border border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => dispatch(toggleWishlist(p))}
          >
            Toggle
          </button> */}
        </div>
      </div>
    ))}
  </div>
</div>
);
}