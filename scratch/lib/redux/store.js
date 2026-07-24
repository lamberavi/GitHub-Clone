import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import repoReducer from './slices/repoSlice';
import notificationReducer from './slices/notificationSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    repos: repoReducer,
    notifications: notificationReducer,
    theme: themeReducer
  }
});
