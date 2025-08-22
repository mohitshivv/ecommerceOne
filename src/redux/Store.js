import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import productsReducer from './productsSlice';
import authReducer from './authSlice';
import checkoutReducer from './checkoutSlice';

const Store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    products: productsReducer,
    auth: authReducer,
    checkout: checkoutReducer,
  },
});

export default Store;

