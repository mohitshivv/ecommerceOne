// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { userContext } from '../context/UserContext';
// import { REACT_APP_USERS_API } from '../utils';

// export default function Login() {
//   const { login, setAllUsers } = useContext(userContext);
//   const navigate = useNavigate();

//   // set the all users data to the context provided by api
//   useEffect(() => {
//     const fetchData = () => {
//       fetch(REACT_APP_USERS_API)
//         .then((res) => res.json())
//         .then((result) => {
//           console.log('all users', result);
//           setAllUsers(result);
//         });
//     };

//     fetchData();
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//     },
//     onSubmit: (values) => {
//       // alert(JSON.stringify(values));
//       login(values);
//       setTimeout(() => {
//         formik.resetForm();
//         navigate('/');
//       }, 1000);
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email('Invalid email').required('Required'),
//       password: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
//     }),
//   });

//   return (
//     <div className=' h-[92vh] dark:bg-gray-900 pt-10'>
      
//     <div className="mx-auto max-w-md p-6 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md shadow-md">
//       <h1 className="font-bold text-2xl mb-4">Login Page</h1>

//       <form onSubmit={formik.handleSubmit}>

//         <div className="mb-4">
//           <label htmlFor="email">Email</label>
//           <input
//             type="text"
//             id="email"
//             className="mt-1 p-2 w-full rounded-md dark:bg-gray-700 dark:text-white"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.email && formik.errors.email ? (
//             <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
//           ) : null}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             className="mt-1 p-2 w-full rounded-md dark:bg-gray-700 dark:text-white"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           {formik.touched.password && formik.errors.password ? (
//             <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
//           ) : null}
//         </div>

//         <div>
//           <button type="submit" className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded shadow-2xl">
//             Submit
//           </button>
//         </div>

//       </form>
//     </div>
    
      
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../redux/authSlice';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isLoading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to home after login
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(loginUser({ username, password }));
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);
    
    // Clear specific field error
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear general error
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Sign In to SwiftShop
          </h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white ${
                errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 dark:bg-gray-700 dark:text-white ${
                errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-md p-3">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          {/* Test Credentials Helper */}
          <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-md p-3">
            <p className="text-xs text-blue-800 dark:text-blue-200">
              <strong>Test Credentials:</strong><br />
              Username: mor_2314<br />
              Password: 83r5^_
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
