import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productSlice';
import categoryReducer from '../features/categorySlice';
import cartReducer from '../features/cartSlice';
import notificationReducer from '../features/notificationSlice';
import productDetailsReducer from '../features/productDetailsSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    notifications: notificationReducer,
    productDetails: productDetailsReducer,
  },
});
