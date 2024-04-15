import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { CartAPI } from "../apis/order/CartAPI";

export const getCartItems = createAsyncThunk("cart/getCartItems", async () => {
  //call api to get cart items
  // const rs = await CartAPI.getCartSession();
  // const data = rs?.data?.result;
  // return data;
});

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (item) => {
    //call api to add item to cart
    const rs = await CartAPI.addItem(item);
    const data = rs?.data?.result;
    return data;
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async (item) => {
    const rs = await CartAPI.updateQuantity(item);
    const data = rs?.data?.result;
    return data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(selectCart, (cart) => cart.items);

export default cartSlice.reducer;
