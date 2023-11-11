import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseAPI } from '../baseAPI';
import axios from 'axios';

export const fetchAsyncCategories = createAsyncThunk(
  'categories/fetchAsyncCategories',
  async (dispatch, getState) => {
    const response = await axios.get(`${baseAPI}categories/`);
    return response.data;
  }
);

const initialState = {
  value: [],
  status: null,
};

// REDUCERS -------------------------------------------------------------

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAsyncCategories.pending]: (state, action) => {
      state.status = 'loading';
    },

    [fetchAsyncCategories.fulfilled]: (state, action) => {
      state.status = 'success';
      state.value = action.payload;
    },

    [fetchAsyncCategories.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default categorySlice.reducer;
