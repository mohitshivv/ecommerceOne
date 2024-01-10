import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../context/UserContext';

// import '../../public/avatar.png'; ;
import avatar from '../../public/avatar.png';

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);

  // const isLoggedIn = localStorage.getItem('login');
  // console.log('islogged in from header', isLoggedIn);

  const { isLoggedIn } = useContext(userContext);
  console.log('islogedin', isLoggedIn)


  return (
    <div className="bg-gradient-to-r from-gray-400 to-gray-200 border-b border-gray-300 p-2 flex flex-col lg:flex-row lg:justify-between transition-all duration-300 ">

      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">
          VirtuCart
        </div>

        {/* Toggle Button for Mobile View */}
        <button
          onClick={() => setShowLinks(!showLinks)}
          className="lg:hidden focus:outline-none text-blue-500 hover:text-blue-700"
        >
          {showLinks ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Responsive Navigation Links */}
      <ul className={`lg:flex lg:flex-row items-center font-semibold text-lg ${showLinks ? 'block' : 'hidden'}`}>
        <li className="mb-2 lg:mb-0 lg:mr-4">
          <Link to='/' className="text-blue-500 hover:text-blue-700">Home</Link>
        </li>
        <li className="mb-2 lg:mb-0 lg:mr-4">
          <Link to='/cart' className="text-blue-500 hover:text-blue-700">Cart</Link>
        </li>
        <li className="mb-2 lg:mb-0 lg:mr-4">
          <Link to='/wishlist' className="text-blue-500 hover:text-blue-700">Wishlist</Link>
        </li>

        {(isLoggedIn === 'false' || !isLoggedIn || isLoggedIn == null || isLoggedIn == 'null') ?

          <li>
            <Link to='/login' className="text-blue-500 hover:text-blue-700">Login</Link>
          </li>

          :
          // <li>Profile</li> 
          <li>
            <Link to='/profile' className="text-blue-500 hover:text-blue-700">
              <img src={avatar} alt="profile" className='rounded-full md:w-1/3 lg:block hidden' />
              <span className='lg:hidden'>Profile</span>
            </Link>
          </li>
        }
      </ul>

    </div>
  );
}
