import { createSlice } from '@reduxjs/toolkit';

const initial = {
  address: JSON.parse(localStorage.getItem('checkout_address') || 'null'),
  payment: JSON.parse(localStorage.getItem('checkout_payment') || 'null'),
  orderId: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: initial,
  reducers: {
    saveAddress: (state, action) => {
      state.address = action.payload;
      localStorage.setItem('checkout_address', JSON.stringify(state.address));
    },
    savePayment: (state, action) => {
      state.payment = action.payload;
      localStorage.setItem('checkout_payment', JSON.stringify(state.payment));
    },
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
    clearCheckout: (state) => {
      state.address = null;
      state.payment = null;
      state.orderId = null;
      localStorage.removeItem('checkout_address');
      localStorage.removeItem('checkout_payment');
    },
  },
});

export const { saveAddress, savePayment, setOrderId, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
