import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseAPI } from '../baseAPI';
import axios from 'axios';

export const fetchAsyncProductDetails = createAsyncThunk(
  'products/fetchAsyncProductDetails',
  async (productId) => {
    const response = await axios.get(`${baseAPI}products/${productId}`);
    return response.data;
  }
);

const initialState = {
  value: {},
  status: null,
};

// REDUCERS -------------------------------------------------------------

export const productDetails = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {
    removeProductDetails: (state) => {
      state.value = {};
    },
  },
  extraReducers: {
    [fetchAsyncProductDetails.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchAsyncProductDetails.fulfilled]: (state, action) => {
      state.status = 'success';
      state.value = action.payload;
    },

    [fetchAsyncProductDetails.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { removeProductDetails } = productDetails.actions;

export default productDetails.reducer;
