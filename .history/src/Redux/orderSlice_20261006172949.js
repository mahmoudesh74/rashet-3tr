
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const confirmOrder = createAsyncThunk(
  "order/confirmOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/v1/orders/confirm",
        orderData
      );

      return response.data;
    } catch (error) {
      console.log(
        "Confirm Order Error:",
        error.response?.data
      );

      return rejectWithValue(
        error.response?.data || {
          Msg: "حدث خطأ أثناء تأكيد الطلب",
        }
      );
    }
  }
);

const initialState = {
  order: null,
  loading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(confirmOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.order =
          action.payload?.data || null;
      })

      .addCase(confirmOrder.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        state.error =
          action.payload?.Msg ||
          action.payload?.message ||
          "حدث خطأ أثناء تأكيد الطلب";
      });
  },
});

export const { clearOrder } =
  orderSlice.actions;

export default orderSlice.reducer;

