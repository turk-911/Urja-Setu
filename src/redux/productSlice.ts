import { Product, Review } from '@/types/product';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { log } from 'console';

const initialState = {
  product: [] as Product[],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.product = [...action.payload]; 
    },
    setReviews: ( state, action: PayloadAction<{ productId: string, reviews: Review[] }>) => {
      const { productId, reviews } = action.payload;

      const productIndex = state.product.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        state.product[productIndex].reviews = reviews;
      }
    },
    updateProdLike: (state, action : PayloadAction<{productId: string, isLiked: boolean}>) => {
      const {productId, isLiked} = action.payload
      const productIndex = state.product.findIndex((product) => product.id === productId);
      if (productIndex !== -1) {
        state.product[productIndex].liked = !isLiked
        console.log(state.product[productIndex], state);
      }
    },  
  },
});

export const { setProducts, setReviews, updateProdLike } = productSlice.actions;

export default productSlice.reducer;