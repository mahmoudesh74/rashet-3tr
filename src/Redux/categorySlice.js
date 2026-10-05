import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/categories");

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.Msg ||
          "حدث خطأ أثناء جلب التصنيفات"
      );
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/categories/${categoryId}?include_products=1`
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.Msg ||
          "حدث خطأ أثناء جلب بيانات المجموعة"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categories",

  initialState: {
    categories: [],
    category: null,
    loading: false,
    categoryLoading: false,
    error: null,
    categoryError: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // جميع التصنيفات
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
      })

      // تصنيف واحد + المنتجات
      .addCase(getCategoryById.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
      })

      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.category = action.payload;
      })

      .addCase(getCategoryById.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload;
      });
  },
});

export default categorySlice.reducer;