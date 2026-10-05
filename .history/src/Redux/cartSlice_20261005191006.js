import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { product_id, size, quantity = 1 },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(
        "/api/v1/cart",
        {
          product_id,
          size,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.Msg ||
          "حدث خطأ أثناء إضافة المنتج للسلة"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;

        console.log("Cart API response:", action.payload);
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;