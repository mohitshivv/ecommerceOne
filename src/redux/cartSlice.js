import { createSlice } from '@reduxjs/toolkit';

function loadInitial() {
try {
const raw = localStorage.getItem('cart');
const parsed = raw ? JSON.parse(raw) : [];
return Array.isArray(parsed) ? parsed : [];
} catch {
return [];
}
}

const initialState = {
items: loadInitial(), // [{ id, title, price, image, qty }]
};

const save = (items) => {
localStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
addToCart(state, action) {
const p = action.payload;
const found = state.items.find((i) => i.id === p.id);
if (found) {
found.qty = (found.qty || 1) + 1;
} else {
state.items.push({
id: p.id,
title: p.title,
price: p.price,
image: p.image,
category: p.category, // optional but useful for display
qty: 1,
});
}
save(state.items);
},
incrementQuantity(state, action) {
const id = action.payload;
const item = state.items.find((i) => i.id === id);
if (item) item.qty += 1;
save(state.items);
},
decrementQuantity(state, action) {
const id = action.payload;
const item = state.items.find((i) => i.id === id);
if (item) {
item.qty -= 1;
if (item.qty <= 0) {
state.items = state.items.filter((i) => i.id !== id);
}
}
save(state.items);
},
removeFromCart(state, action) {
const id = action.payload;
state.items = state.items.filter((i) => i.id !== id);
save(state.items);
},
clearCart(state) {
state.items = [];
save(state.items);
},
},
});

export const {
addToCart,
incrementQuantity,
decrementQuantity,
removeFromCart,
clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

