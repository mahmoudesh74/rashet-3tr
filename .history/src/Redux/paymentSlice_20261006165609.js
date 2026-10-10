import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const selectPaymentMethod = createAsyncThunk(
  "payment/selectPaymentMethod",
  async (paymentMethod, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "/api/v1/checkout/payment-method",
        {
          payment_method: paymentMethod,
        }
      );

      return response.data;
    } catch (error) {
      console.log("Payment Method Error:", error.response);

      return rejectWithValue(
        error.response?.data || {
          Msg: "حدث خطأ أثناء اختيار طريقة الدفع",
        }
      );
    }
  }
);

const initialState = {
  paymentMethod: null,
  label: "",
  loading: false,
  error: null,
  success: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,

  reducers: {
    clearPaymentMethod: (state) => {
      state.paymentMethod = null;
      state.label = "";
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(selectPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(
        selectPaymentMethod.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.paymentMethod =
            action.payload?.data?.payment_method || null;

          state.label =
            action.payload?.data?.label || "";
        }
      )

      .addCase(
        selectPaymentMethod.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload?.Msg ||
            action.payload?.message ||
            "حدث خطأ أثناء اختيار طريقة الدفع";
        }
      );
  },
});

export const { clearPaymentMethod } =
  paymentSlice.actions;

export default paymentSlice.reducer;