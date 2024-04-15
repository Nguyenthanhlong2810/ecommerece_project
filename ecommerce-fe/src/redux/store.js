import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import categorySlice from "./categorySlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categorySlice,
  },
});

export default store;
