// src/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '../utils/types';

interface CartState {
  items: TConstructorIngredient[];
}

const initialState: CartState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.items.push(action.payload);
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addItemToCart, removeItemFromCart, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
