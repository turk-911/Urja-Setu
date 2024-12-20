import { cartProduct } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  cart: [] as cartProduct[],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<cartProduct[]>) => {
        state.cart = [...action.payload]; 
        console.log(state.cart);
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;