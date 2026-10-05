import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import authReddecer from "./authSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
      auth: authReddecer,
       cart: cartReducer,
  },
});