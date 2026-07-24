import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      if (action.payload && action.payload.user) {
        state.user = action.payload.user;
        state.token = action.payload.token || state.token;
      } else {
        state.user = action.payload;
      }
      state.error = null;
    },
    signup: (state, action) => {
      state.isAuthenticated = true;
      if (action.payload && action.payload.user) {
        state.user = action.payload.user;
        state.token = action.payload.token || state.token;
      } else {
        state.user = action.payload;
      }
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    }
  }
});

export const { login, signup, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
