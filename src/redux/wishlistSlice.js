import { createSlice } from '@reduxjs/toolkit';

const initial = JSON.parse(localStorage.getItem('wishlist') || '[]');

const wishlistSlice = createSlice({
name: 'wishlist',
initialState: { items: initial },
reducers: {
// Existing toggle behavior
toggleWishlist(state, action) {
const p = action.payload;
const exists = state.items.find((i) => i.id === p.id);
if (exists) state.items = state.items.filter((i) => i.id !== p.id);
else state.items.push({ id: p.id, title: p.title, price: p.price, image: p.image });
localStorage.setItem('wishlist', JSON.stringify(state.items));
},
// Explicit add for legacy imports
addToWishlist(state, action) {
const p = action.payload;
const exists = state.items.find((i) => i.id === p.id);
if (!exists) {
state.items.push({ id: p.id, title: p.title, price: p.price, image: p.image });
localStorage.setItem('wishlist', JSON.stringify(state.items));
}
},
// Explicit remove for legacy imports
removeFromWishlist(state, action) {
const id = action.payload;
state.items = state.items.filter((i) => i.id !== id);
localStorage.setItem('wishlist', JSON.stringify(state.items));
},
clearWishlist(state) {
state.items = [];
localStorage.setItem('wishlist', JSON.stringify(state.items));
},
},
});

export const {
toggleWishlist,
addToWishlist,
removeFromWishlist,
clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;