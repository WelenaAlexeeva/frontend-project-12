import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { chatApi } from '../services/chatApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});
