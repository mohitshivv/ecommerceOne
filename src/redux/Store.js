
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';
import productsReducer from './productsSlice';

const Store = configureStore({
reducer: {
cart: cartReducer,
wishlist: wishlistReducer,
products: productsReducer,
},
});

export default Store;