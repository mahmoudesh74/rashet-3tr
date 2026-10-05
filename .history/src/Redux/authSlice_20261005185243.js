import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.Msg ||
          "حدث خطأ أثناء تسجيل الدخول"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    token: null,
    tokenType: "Bearer",
    loading: false,
    error: null,
    isAuthenticated: false,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tokenType = "Bearer";
      state.isAuthenticated = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.token = action.payload.token;

        state.tokenType =
          action.payload.token_type || "Bearer";

        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;

        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;