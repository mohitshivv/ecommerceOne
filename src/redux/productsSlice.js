import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
name: 'products',
initialState: {
search: '',
},
reducers: {
setSearch(state, action) {
state.search = action.payload || '';
},
clearSearch(state) {
state.search = '';
},
},
});

export const { setSearch, clearSearch } = productsSlice.actions;
export default productsSlice.reducer;