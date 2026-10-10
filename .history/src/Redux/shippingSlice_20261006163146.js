
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axios";

export const getShippingMethods = createAsyncThunk(
  "shipping/getShippingMethods",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/api/v1/checkout/shipping-methods"
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          Msg: "حدث خطأ أثناء جلب طرق الشحن",
        }
      );
    }
  }
);

const initialState = {
  freeShippingThreshold: 0,
  currentSubtotal: 0,
  isFreeEligible: false,
  methods: [],
  loading: false,
  error: null,
};

const shippingSlice = createSlice({
  name: "shipping",

  initialState,

  reducers: {
    clearShippingMethods: (state) => {
      state.freeShippingThreshold = 0;
      state.currentSubtotal = 0;
      state.isFreeEligible = false;
      state.methods = [];
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getShippingMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getShippingMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const data = action.payload.data;

        state.freeShippingThreshold =
          data.free_shipping_threshold;

        state.currentSubtotal =
          data.current_subtotal;

        state.isFreeEligible =
          data.is_free_eligible;

        state.methods = data.methods;
      })

      .addCase(getShippingMethods.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.Msg ||
          action.payload?.message ||
          "حدث خطأ أثناء جلب طرق الشحن";
      });
  },
});

export const { clearShippingMethods } =
  shippingSlice.actions;

export default shippingSlice.reducer;

