import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import authReddecer from "./authSlice";
import cartReducer from "./cartSlice";
import productsReducer from "./productSlice";
import productDetailsReducer from "./productDetailsSlice";
import checkoutReducer from "./checkoutSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
      auth: authReddecer,
       cart: cartReducer,
       products: productsReducer,
        productDetails: productDetailsReducer,
           checkout: checkoutReducer,
  },
});