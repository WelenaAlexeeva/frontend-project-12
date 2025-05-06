import { configureStore } from '@reduxjs/toolkit';
import { chatApi } from '../services/chatApi';
import authReducer from './slices/authSlice';
import activeChannelReducer from './slices/activeChannelSlice';
import modalReduser from './slices/modalSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activeChannel: activeChannelReducer,
    [chatApi.reducerPath]: chatApi.reducer,
    modal: modalReduser,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});
