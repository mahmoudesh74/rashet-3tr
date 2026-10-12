```jsx
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getWishlist, clearWishlist } from "./wishlistSlice";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      const loginData = response.data.data;

      // حفظ بيانات تسجيل الدخول
      localStorage.setItem("token", loginData.token);
      localStorage.setItem(
        "tokenType",
        loginData.token_type || "Bearer"
      );

      // تحميل المفضلة بعد حفظ الـ Token
      await dispatch(getWishlist()).unwrap();

      return loginData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.Msg ||
          error.message ||
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
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      state.tokenType = "Bearer";
      state.isAuthenticated = false;
      state.error = null;

      localStorage.removeItem("token");
      localStorage.removeItem("tokenType");

      // مسح المفضلة من Redux عند تسجيل الخروج
      action.asyncDispatch?.(clearWishlist());
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
        state.tokenType = action.payload.token_type || "Bearer";
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
```