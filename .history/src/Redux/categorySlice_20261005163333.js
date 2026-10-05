import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/api";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/v1/categories");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "حدث خطأ أثناء جلب التصنيفات"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;