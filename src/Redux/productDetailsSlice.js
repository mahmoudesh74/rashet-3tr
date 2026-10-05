import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk(
  "productDetails/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/products/${id}`);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.Msg ||
          error.response?.data?.message ||
          "حدث خطأ أثناء جلب تفاصيل المنتج"
      );
    }
  }
);

const initialState = {
  product: null,
  loading: false,
  error: null,
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.product = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null;
      })

      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })

      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductDetails } = productDetailsSlice.actions;

export default productDetailsSlice.reducer;