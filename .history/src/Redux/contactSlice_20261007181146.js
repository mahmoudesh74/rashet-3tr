import { createSlice } from "@reduxjs/toolkit";
 import {createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";
 export const sendContactMessage = createAsyncThunk(
  "contact/sendContactMessage", 
  async (contactData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/v1/contact", contactData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);
const contactSlice = createSlice({
    name: "contact",
    initialState:{
        message: null,
        error: null,
        success: false,
        loading: false,

    },
    reducers:{
         resetContactState: (state) =>{
            state.message = null;
            state.error = null;
            state.success = false;
            state.loading = false;
         } 


    },
    extraReducers: (builder) => {
      builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload?.message || null;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
    },
});
export const { resetContactState } = contactSlice.actions;

export default contactSlice.actions;