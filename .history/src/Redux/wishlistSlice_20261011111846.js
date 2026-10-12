
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/v1/wishlist");

      const result = data?.data;

      return Array.isArray(result)
        ? result
        : result?.items ?? result?.wishlist ?? [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.Msg ||
          "Failed to load wishlist"
      );
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, { dispatch, rejectWithValue }) => {
    try {
      await api.post("/api/v1/wishlist", {
        product_id: productId,
      });

      await dispatch(getWishlist()).unwrap();

      return productId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.Msg ||
          "Failed to add product"
      );
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (wishlistItemId, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/api/v1/wishlist/${wishlistItemId}`);

      await dispatch(getWishlist()).unwrap();

      return wishlistItemId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data?.Msg ||
          "Failed to remove product"
      );
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  actionLoading: false,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.actionLoading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addToWishlist.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      .addCase(removeFromWishlist.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
