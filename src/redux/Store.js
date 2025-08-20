
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
// If you have products/search slice, import it too

const Store = configureStore({
reducer: {
cart: cartReducer,
wishlist: wishlistReducer,
// products: productsReducer, // if present
},
});

export default Store;