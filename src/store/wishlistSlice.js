import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalCount: 0,
  wishlistItems: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.wishlistItems.find((item) => item.id === product.id);
      if (!exists) {
        state.wishlistItems.push(product);
        state.totalCount = state.wishlistItems.length;
      }
    },
    removeWishlist: (state, action) => {
      const productId = action.payload;
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== productId
      );
      state.totalCount = state.wishlistItems.length;
    },
    resetWhishlist: (state) => {
      state.wishlistItems = [];
      state.totalCount = 0;
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const { addWishlist, removeWishlist, resetWhishlist } =
  wishlistSlice.actions;
