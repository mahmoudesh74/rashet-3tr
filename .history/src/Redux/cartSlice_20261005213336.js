import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthHeaders = (token) => {
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

// =========================
// GET CART
// =========================
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get("/api/v1/cart", {
        headers: getAuthHeaders(token),
      });

      const cart = response.data.data;

      const items = (cart.items || []).map((item) => ({
        id: item.id,
        product_id: item.product_id,
        name: item.name,
        name_en: item.name_en,
        brand: item.brand,
        size: item.size,
        price: item.unit_price,
        qty: item.quantity,
        total_price: item.total_price,
        image: item.image,
        in_stock: item.in_stock,
        stock_quantity: item.stock_quantity,
      }));

      return {
        ...cart,
        items,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.Msg ||
          "حدث خطأ أثناء جلب السلة"
      );
    }
  }
);

// =========================
// ADD TO CART
// =========================
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { product_id, size, quantity = 1 },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(
        "/api/v1/cart",
        {
          product_id,
          size,
          quantity,
        },
        {
          headers: getAuthHeaders(token),
        }
      );

      await dispatch(getCart());

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.Msg ||
          "حدث خطأ أثناء إضافة المنتج إلى السلة"
      );
    }
  }
);

// =========================
// UPDATE CART ITEM
// =========================
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (
    { product_id, size, quantity },
    { getState, dispatch, rejectWithValue }
  ) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(
        "/api/v1/cart",
        {
          product_id,
          size,
          quantity,
        },
        {
          headers: getAuthHeaders(token),
        }
      );

      await dispatch(getCart());

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.Msg ||
          "حدث خطأ أثناء تحديث الكمية"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    items_count: 0,
    subtotal: 0,
    discount_amount: 0,
    coupon: null,
    shipping_cost: 0,
    is_free_shipping: false,
    free_shipping_threshold: 200,
    remaining_for_free_shipping: 200,
    currency: "ر.س",
    total: 0,

    loading: false,
    adding: false,
    updating: false,
    error: null,
  },

  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.items_count = 0;
      state.subtotal = 0;
      state.discount_amount = 0;
      state.shipping_cost = 0;
      state.total = 0;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET CART
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;

        const cart = action.payload;

        state.items = cart.items || [];
        state.items_count = cart.items_count || 0;
        state.subtotal = cart.subtotal || 0;
        state.discount_amount = cart.discount_amount || 0;
        state.coupon = cart.coupon || null;
        state.shipping_cost = cart.shipping_cost || 0;
        state.is_free_shipping =
          cart.is_free_shipping || false;

        state.free_shipping_threshold =
          cart.free_shipping_threshold || 0;

        state.remaining_for_free_shipping =
          cart.remaining_for_free_shipping || 0;

        state.currency = cart.currency || "ر.س";
        state.total = cart.total || 0;
      })

      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addToCart.pending, (state) => {
        state.adding = true;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state) => {
        state.adding = false;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.adding = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateCartItem.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(updateCartItem.fulfilled, (state) => {
        state.updating = false;
      })

      .addCase(updateCartItem.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;