import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

// Import page-specific reducers
import transactionDetailReducer from '@/pages/TransactionManagement/TransactionDetail/store/transactionDetailSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    transactionDetail: transactionDetailReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.DEV,
});

export default store;
