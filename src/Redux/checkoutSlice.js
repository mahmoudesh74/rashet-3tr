
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const saveShippingAddress = createAsyncThunk(
  "checkout/saveShippingAddress",
  async (shippingData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/v1/checkout/shipping-address", shippingData)
       

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          Msg: "حدث خطأ أثناء حفظ عنوان الشحن",
        }
      );
    }
  }
);

const initialState = {
  shippingAddress: null,
  loading: false,
  error: null,
  success: false,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,

  reducers: {
    clearShippingAddress: (state) => {
      state.shippingAddress = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveShippingAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(saveShippingAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        state.shippingAddress = action.payload.data;
      })

      .addCase(saveShippingAddress.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload?.Msg ||
          action.payload?.message ||
          "حدث خطأ أثناء حفظ عنوان الشحن";
      });
  },
});

export const { clearShippingAddress } = checkoutSlice.actions;

export default checkoutSlice.reducer;

