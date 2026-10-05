import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// =========================
// GET PRODUCTS
// =========================
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/products");

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.Msg ||
          "حدث خطأ أثناء جلب المنتجات"
      );
    }
  }
);

// =========================
// PRODUCTS SLICE
// =========================
const productsSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // GET PRODUCTS - PENDING
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // GET PRODUCTS - SUCCESS
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      // GET PRODUCTS - ERROR
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;