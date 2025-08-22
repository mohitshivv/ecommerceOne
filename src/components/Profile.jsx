// import React, { useContext } from 'react';
// import { userContext } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {

    
//     const {logout} = useContext(userContext);
//     const storageData = localStorage.getItem('currentUser');
//     console.log('',storageData);
//     if(storageData == 'null' || storageData == undefined){
//         return(
//             <h1>No SignIn user to go login</h1>
//         )
//     }
//     const user = JSON.parse(atob(storageData));
//     console.log(user);

//     const navigate = useNavigate();

//     const handleLogout = ()=>{
//         logout();
//         navigate('/login');
//     }
    
//     return (
//         <div className="dark:bg-gray-900 h-[92vh] py-16">
            
//         <div className="max-w-lg mx-auto bg-white p-8 rounded shadow-md mb-8 animate-fade-in dark:bg-gray-800 dark:text-white">
//           <h2 className="text-2xl font-bold mb-4 capitalize">{`${user.name.firstname} ${user.name.lastname}`}</h2>
//           <p className="text-gray-600 mb-4">{user.email}</p>
      
//           <div className="mb-4">
//             <h3 className="text-xl font-bold mb-2">Address</h3>
//             <p>{`${user.address.number} ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</p>
//           </div>
      
//           <div className="mb-4">
//             <h3 className="text-xl font-bold mb-2">Contact</h3>
//             <p>{`Phone: ${user.phone}`}</p>
//           </div>
      
//           <div className="mb-4">
//             <h3 className="text-xl font-bold mb-2">Geolocation</h3>
//             <p>{`Latitude: ${user.address.geolocation.lat}, Longitude: ${user.address.geolocation.long}`}</p>
//           </div>
      
//           <div className="flex justify-around">
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none">
//               Logout
//             </button>
//           </div>
//         </div>
        
//         </div>
//       );
      
// };

// export default Profile;
// src/pages/Profile.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { FiUser, FiMail, FiShield, FiLogOut, FiShoppingBag, FiMapPin } from 'react-icons/fi';

export default function Profile() {
  const { isAuthenticated, user, token } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          <FiUser className="mx-auto text-amber-600 mb-4" size={44} />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">You’re not signed in</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Please login to view and manage your profile.
          </p>
          <Link
            to="/login"
            className="inline-block mt-6 px-6 py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <aside className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xl font-bold">
              {(user || 'U').toString().charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Signed in as</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{user}</p>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <Link
              to="/orders"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <FiShoppingBag /> Orders
            </Link>
            <Link
              to="/addresses"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <FiMapPin /> Addresses
            </Link>
            <Link
              to="/security"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
            >
              <FiShield /> Security
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40"
          >
            <FiLogOut /> Logout
          </button>
        </aside>

        {/* Main content */}
        <main className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-100 dark:border-gray-700 p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage your personal information and account settings.
          </p>

          {/* Basic info cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FiUser className="text-amber-600" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Username</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{user}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <FiMail className="text-amber-600" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {/* Fake Store doesn’t return email with login.
                       If you store one in localStorage, render it here */}
                    Not provided
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Security note */}
          <div className="mt-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200">
            This is a demo profile using Fake Store API authentication. Keep sensitive information out of client storage.
          </div>
        </main>
      </div>
    </div>
  );
}

