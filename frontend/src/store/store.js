import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { chatApi } from '../services/chatApi';
import activeChannelReducer from './slices/activeChannelSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activeChannel: activeChannelReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});
