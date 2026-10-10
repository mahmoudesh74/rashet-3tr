import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import api from "../api/axios";

export const subscribeNewsletter = createAsyncThunk(
  "newsletter/subscribeNewsletter",

  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post(
        "/api/v1/newsletter/subscribe",
        {
          email: email,
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.Msg ||
          error.response?.data?.message ||
          error.message ||
          "حدث خطأ أثناء الاشتراك في النشرة البريدية"
      );
    }
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",

  initialState: {
    email: null,
    loading: false,
    success: false,
    error: null,
    message: null,
  },

  reducers: {
    resetNewsletter: (state) => {
      state.email = null;
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(
        subscribeNewsletter.pending,
        (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
          state.message = null;
        }
      )

      .addCase(
        subscribeNewsletter.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;
          state.error = null;

          state.email =
            action.payload?.data?.email || null;

          state.message =
            action.payload?.Msg || null;
        }
      )

      .addCase(
        subscribeNewsletter.rejected,
        (state, action) => {
          state.loading = false;
          state.success = false;

          state.error =
            action.payload ||
            action.error.message ||
            "حدث خطأ أثناء الاشتراك";
        }
      );
  },
});

export const { resetNewsletter } =
  newsletterSlice.actions;

export default newsletterSlice.reducer;