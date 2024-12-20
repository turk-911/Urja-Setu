import { Order } from '@/types/order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface orderWithId extends Order{
  id: string | null;
  chatId: string | null;
  status: string | null;
}

const initialState = {
    order: [] as orderWithId[],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<orderWithId[]>) => {
        state.order = action.payload;        
        console.log(state.order)
    },
    setChatId: (state, action: PayloadAction<{id: string, orderId: string}>) => {
      const { id, orderId } = action.payload;
      state.order = state.order.map((order) =>
        order.id === orderId ? { ...order, chatId: id } : order
      );
    },
  },
})

export const {setOrders, setChatId} = orderSlice.actions

export default orderSlice.reducer