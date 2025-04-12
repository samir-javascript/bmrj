// src/store/slices/shippingSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { IShipping } from '@/database/models/shippingAdress.model';

interface ShippingState {
  shippingAddress: IShipping | null;
}

const initialState: ShippingState = {
  shippingAddress: null,
};

const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    setShippingAddress: (state, action) => {
     state.shippingAddress = action.payload;
    },
    clearShippingAddress: (state) => {
      state.shippingAddress = null;
    },
  },
});

export const { setShippingAddress, clearShippingAddress } = shippingSlice.actions;
export default shippingSlice.reducer;
