import { createSlice } from "@reduxjs/toolkit";
interface PaymentMethodProps {
  paymentMethod: "stripe" | "COD" | null;
}

const initialState: PaymentMethodProps = {
    paymentMethod: null,
};

const paymentSlice = createSlice({
    name: "paymentMethod",
    initialState,
    reducers: {
        setPaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
        },
    }
})
export const { setPaymentMethod } = paymentSlice.actions
export default paymentSlice.reducer;

