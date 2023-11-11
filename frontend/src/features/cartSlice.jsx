import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  value: cartItemsFromLocalStorage,
  status: null,
};

// REDUCERS -------------------------------------------------------------

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      // find will return the object if it is found, but if it is not found then it will return undefined
      const itemInCart = state.value.find((x) => x.id === newItem.id);

      if (itemInCart) {
        state.value.map((item) =>
          item.id === newItem.id
            ? (item.quantity = item.quantity + newItem.quantity)
            : item
        );
      } else {
        state.value.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },

    removeAllCartItems: (state, action) => {
      state.value = [];
    },

    changeQuantityByOne: (state, action) => {
      switch (action.payload.operation) {
        case 'add':
          state.value.map((item) =>
            item.id === action.payload.productId &&
            item.countInStock > item.quantity
              ? (item.quantity += 1)
              : item
          );
          break;

        case 'subtract':
          if (action.payload.currentQuantity > 0) {
            state.value.map((item) =>
              item.id === action.payload.productId ? (item.quantity -= 1) : item
            );
          }
          break;

        default:
          break;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  changeQuantityByOne,
  removeAllCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
