import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

// REDUCERS -------------------------------------------------------------

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showHideNotification: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: {},
});

export const { showHideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
