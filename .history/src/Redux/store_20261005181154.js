import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import authReddecer from "./authSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
      auth: authReddecer,
  },
});